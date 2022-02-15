import { directionValues } from '../models/posts-request/directionValues.model.js';
import { sortByValues } from '../models/posts-request/sortByValues.model.js';

export const UtilityService = {};

UtilityService.convertStringToArray = (tags, delimiter) => {
  const strTags= String(tags);
  return strTags.split(delimiter).map((tag) => tag.trim());
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

UtilityService.sortPosts = (arr, sortBy = sortByValues.default, direction = directionValues.default) => {
  // Sorts in place
  return arr.sort(
    (postA, postB) => {
      // console.log({direction, sortBy, postA: postA[sortBy], postB: postB[sortBy]});

      return direction === directionValues.desc ?
        -1*(postA[sortBy] - postB[sortBy]) : // Descending
            postA[sortBy] - postB[sortBy]; // Ascending
    });
}
