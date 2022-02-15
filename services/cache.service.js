import fs from 'fs';
import path from 'path';

export const CacheService = {};
const cachePath = process.env.NODE_ENV === 'test' ? '__tests__/cache' : 'cache';

CacheService.cachePosts = (posts, tag) => {
  // We don't want data to get overwritten with empty arrays.
  // Better to have cache that still provides some value
  if (posts.length > 0) {
    fs.writeFileSync(path.resolve(`${cachePath}/${tag}.json`), JSON.stringify(posts));
  }
}

CacheService.getCachedPosts = (tag) => {
  console.log('[Utility Service] Getting Cached Posts')

  let fileName = CacheService.matchCacheFiles(tag);
  if(!!fileName) {
    const cachedFile = fs.readFileSync(path.resolve(`${cachePath}/${fileName}`));
    return JSON.parse(cachedFile.toString());
  }
  return undefined;
}

CacheService.matchCacheFiles = (tag) => {
  const files = fs.readdirSync(path.resolve(cachePath));

  const regex = new RegExp(tag + '.', 'g');
  return files.find((file) => file.match(regex));
}
