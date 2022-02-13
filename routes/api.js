import express from 'express';
import { UtilityService } from '../services/utility.service.js';
import { sortByValues } from '../models/posts-request/sortByValues.model.js';
import { directionValues } from '../models/posts-request/directionValues.model.js';
import { HttpService } from '../services/http.service.js';
import { CacheService } from '../services/cache.service.js';
let router = express.Router();

//GET Ping API
router.get('/ping', (req, res) => {
  res.status(200).send({success: true});
});

//GET Posts filtered by tags,
router.get('/posts', async (req, res) => {
  let { sortBy, direction, tags } = req.query;
  sortBy = sortBy?.trim() === "" ? undefined : sortBy;
  direction = direction?.trim() === "" ? undefined : direction;
  tags = tags?.trim() === "" ? undefined : tags;

  let error = {};
  let hatchwayAPI = "https://api.hatchways.io/assessment/blog/posts";

  console.log("[API] Getting Posts with Parameters: ", {tags, sortBy, direction});

  // Parameter Checking; Multiple parameters might be invalid
  if (!tags) {
    error.tags = "Tags parameter is required";
  }
  if (sortBy && !sortByValues.hasOwnProperty(sortBy)) {
    error.sortBy = "sortBy parameter is invalid. (id, reads, likes, popularity)";
  }
  if (direction && !directionValues.hasOwnProperty(direction)) {
    error.direction = "direction parameter is invalid. (desc, asc)";
  }
  if(Object.keys(error).length > 0) {
    console.log("[API] Invalid Parameters: ", error);
    res.status(400).send({error});
  } else {

    // Fetching data
    const tags = UtilityService.convertTagsToArray(req.query.tags);
    let posts = await Promise.all(tags.map((tag) => {
      const cachedPosts = CacheService.getCachedPosts(tag);
      if (!!cachedPosts) {
        // Keeps data fresh, while giving cached data to users very quickly (3.54s -> 0.85s)
        HttpService.getPostsByTag(hatchwayAPI + `?tag=${tag}`, tag);
        return cachedPosts;
      }
      return HttpService.getPostsByTag(hatchwayAPI + `?tag=${tag}`, tag);
    }));

    posts = posts.flat();

    // Transforming Data
    if(tags.length > 1) {
      posts = UtilityService.removeDuplicates(posts);
    }
    if(!!sortBy?.trim() || !!direction?.trim()) {
      posts = UtilityService.sortPosts(posts, sortBy, direction);
      // fs.writeFileSync(path.resolve(`data-3.json`), JSON.stringify(posts));
    }
    res.status(200).send({posts});
  }
});

export default router;
