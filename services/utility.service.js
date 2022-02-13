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
