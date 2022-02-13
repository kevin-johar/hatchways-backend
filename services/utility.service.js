import * as fs from 'fs';
import * as path from 'path';

export const UtilityService = {};

UtilityService.convertTagsToArray = (tags) => {
  const strTags= String(tags);
  return strTags.split(',').map((tag) => tag.trim());
};

// Sorts and removes duplicates from an array
UtilityService.sortAndFilterArray = (arr, sortBy, direction) => {
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
