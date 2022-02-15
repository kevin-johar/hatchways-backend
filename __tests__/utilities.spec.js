import { UtilityService } from '../services/utility.service.js';
import path from 'path';
import fs from 'fs';


describe('[Utility Service] ', () => {
  describe('convertStringToArray', () => {
    const stringSplitData = [
      ['', ',', ['']],
      ['tech,history,arts', ',', ['tech', 'history', 'arts']],
      ['  tech    ,  history   , arts', ',', ['tech', 'history', 'arts']],
      ['tech-history', ',', ['tech-history']]
    ];
    test.each(stringSplitData)('%#. Given: %j Delimiter: %s Expected: %j', (given, delimiter, expected) => {
      const res  =UtilityService.convertStringToArray(given, delimiter);
      expect(res).toStrictEqual(expected);
    });
  });

  describe('removeDuplicates', () => {
    const duplicateTestData = () => {
      const data = fs.readFileSync(path.resolve('__tests__/test-data/utilities.remove-duplicates.json'));
      return JSON.parse(data.toString());
    }

    test.each(duplicateTestData())('should remove duplicate objects from array', (given, expected) => {
      const res = UtilityService.removeDuplicates(given);
      console.log(res);
      expect(res).toStrictEqual(expected);
    });
  });

  describe('sortPosts', () => {
    const sortPostsTestData = () => {
      const data = fs.readFileSync(path.resolve('__tests__/test-data/utilities.sort-posts.json'));
      return JSON.parse(data.toString());
    }

    test.each(sortPostsTestData())('%#. %s', (testName, sortBy, direction, given, expected) => {
      const res = UtilityService.sortPosts(given, sortBy, direction);
      expect(res).toStrictEqual(expected);
    });
  });
});
