import { UtilityService } from '../services/utility.service.js';
import * as matchers from 'jest-extended';

expect.extend(matchers);

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
      expect(res).toBeArray();
      expect(res).toStrictEqual(expected);
    });
  });
});
