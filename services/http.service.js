import axios from 'axios';
import { UtilityService } from './utility.service.js';

export const HttpService = {};

HttpService.getPostsByTag = async (url, tag) => {
  return axios
    .get(url)
    .then((res) => {
      UtilityService.cachePosts(res.data.posts, tag);
      return res.data.posts;
    })
    .catch((error) => {
      console.log('HTTP-ERROR-Error trying to make a get request\n', error);
    });
};
