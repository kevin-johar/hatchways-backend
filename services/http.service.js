import axios from 'axios';

export const http = {};

http.getPostByTag = async (url) => {
  return axios
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log('HTTP-ERROR-Error trying to make a get request\n', error);
    });
};
