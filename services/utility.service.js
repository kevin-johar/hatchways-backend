export const utility = {};

utility.convertTagsToArray = (tags) => {
  const strTags= String(tags);
  return strTags.split(',').map((tag) => tag.trim());
};
