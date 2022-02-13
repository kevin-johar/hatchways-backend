import express from 'express';
import { UtilityService } from '../services/utility.service.js';
import { sortByValues } from '../models/posts-request/sortByValues.js';
import { directionValues } from '../models/posts-request/directionValues.js';
import { HttpService } from '../services/http.service.js';
let router = express.Router();

//GET Ping API
router.get('/ping', (req, res) => {
  res.status(200).send({success: true});
});

//GET Posts filtered by tags,
router.get('/posts', async (req, res) => {
  let error = {};
  let hatchwayAPI = "https://api.hatchways.io/assessment/blog/posts";

  if (!req.query || !req.query.tags) {
    error.tags = "Tags parameter is required";
  }
  if (req.query.sortBy && (sortByValues.findIndex((value) => req.query.sortBy === value) === -1)) {
    error.sortBy = "sortBy parameter is invalid";
  }
  if (req.query.direction && (directionValues.findIndex((value) => req.query.direction === value) === -1)) {
    error.direction = "direction parameter is invalid";
  }
  if(Object.keys(error).length > 0) {
    res.status(400).send({error});
  }

  const tags = UtilityService.convertTagsToArray(req.query.tags);
  const posts = await Promise.all(tags.map((tag) => HttpService.getPostsByTag(hatchwayAPI + `?tag=${tag}`)));
  res.send({posts}, 200);
});

export default router;
