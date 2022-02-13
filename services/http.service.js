import axios from 'axios';

export const HttpService = {};

HttpService.getPostsByTag = async (url) => {
  console.log(url);
  return axios
    .get(url)
    .then((res) => {
      return res.data.posts;
    })
    .catch((error) => {
      console.log('HTTP-ERROR-Error trying to make a get request\n', error);
    });
};
