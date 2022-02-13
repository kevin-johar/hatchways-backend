import axios from 'axios';
import { UtilityService } from './utility.service.js';

export const HttpService = {};

HttpService.getPostsByTag = async (url, tag) => {
  return axios
    .get(url)
    .then((res) => {
      console.log("[HTTP Service] - Cached Posts, returning promisified data")
      UtilityService.cachePosts(res.data.posts, tag);
      return res.data.posts;
    })
    .catch((error) => {
      console.log('[HTTP Service] - [Error] - getPostsByTag', error);
    });
};
