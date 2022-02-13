import * as fs from 'fs';
import * as path from 'path';
import { directionValues } from '../models/posts-request/directionValues.model.js';

export const UtilityService = {};

UtilityService.convertTagsToArray = (tags) => {
  const strTags= String(tags);
  return strTags.split(',').map((tag) => tag.trim());
};

UtilityService.removeDuplicates = (arr) => {
  let noDuplicates = new Set();
  for(let i = 0; i < arr.length; i++) {
    noDuplicates[`${arr[i].id}`] = arr[i];

  }
  let uniquePosts = [];
  for(const property in noDuplicates) {
    uniquePosts.push(noDuplicates[property]);

  }

  return uniquePosts;
}

UtilityService.sortPosts = (arr, sortBy, direction) => {
  // Sorts in place
  return arr.sort(
    (postA, postB) => {
      console.log({direction, sortBy, postA: postA[sortBy], postB: postB[sortBy]});

      return direction === directionValues.desc ?
        postA[sortBy] - postB[sortBy] : // Descending
      -1*(postA[sortBy] - postB[sortBy]); // Ascending
    });
}

UtilityService.cachePosts = (posts, tag) => {
  // if(UtilityService.matchCacheFiles(tag) === -1) {
  fs.writeFileSync(path.resolve(`cache/${tag}.json`), JSON.stringify(posts));
  // }
}

UtilityService.getCachedPosts = (tag) => {
  const files = fs.readdirSync(path.resolve('cache'));
  let fileName = UtilityService.matchCacheFiles(tag);
  if(!!fileName) {
    const cachedFile = fs.readFileSync(path.resolve(`cache/${fileName}`));
    return JSON.parse(cachedFile);
  }
   return undefined;
}

UtilityService.matchCacheFiles = (tag) => {
  //todo: find a way to make this non-blocking
  const files = fs.readdirSync(path.resolve('cache'));

  const regex = new RegExp(tag + '.', 'g');
  return files.find((file) => file.match(regex));
}
