import fs from 'fs';
import path from 'path';

export const CacheService = {};

CacheService.cachePosts = (posts, tag) => {
  // We don't want data to get overwritten with empty arrays.
  // Better to have cache that still provides some value
  if (posts.length > 0) {
    fs.writeFileSync(path.resolve(`cache/${tag}.json`), JSON.stringify(posts));
  }
}

CacheService.getCachedPosts = (tag) => {
  console.log('[Utility Service] Getting Cached Posts')
  const files = fs.readdirSync(path.resolve('cache'));
  let fileName = CacheService.matchCacheFiles(tag);
  if(!!fileName) {
    const cachedFile = fs.readFileSync(path.resolve(`cache/${fileName}`));
    return JSON.parse(cachedFile);
  }
  return undefined;
}

CacheService.matchCacheFiles = (tag) => {
  //todo: find a way to make this non-blocking
  const files = fs.readdirSync(path.resolve('cache'));

  const regex = new RegExp(tag + '.', 'g');
  return files.find((file) => file.match(regex));
}
