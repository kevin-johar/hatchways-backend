import axios from 'axios';
import { CacheService } from './cache.service.js';

export const HttpService = {};

HttpService.getPostsByTag = (url, tag) => {
  return axios
    .get(url)
    .then((res) => {
      console.log("[HTTP Service] - Cached Posts, returning promisified data")
      CacheService.cachePosts(res.data.posts, tag);
      return res.data.posts;
    })
    .catch((error) => {
      console.log('[HTTP Service] - [Error] - getPostsByTag', error);
    });
};
