import * as fs from 'fs';
import * as path from 'path';

export const UtilityService = {};

UtilityService.convertTagsToArray = (tags) => {
  const strTags= String(tags);
  return strTags.split(',').map((tag) => tag.trim());
};

UtilityService.cachePosts = async (posts, tag) => {
  //todo: find a way to make this non-blocking
  const files = fs.readdirSync(path.resolve('cache'));
  const regex = new RegExp(tag + '.', 'g');

  if(files.findIndex((file) => file.match(regex)) === -1) {
    fs.writeFileSync(path.resolve(`cache/${tag}.json`), JSON.stringify(posts));
  }
}
