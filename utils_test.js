// src/__tests__/utils.test.js
import { formatDate } from '../utils/helpers';

describe('Helper Functions', () => {
  test('correctly formats the date', () => {
    const date = new Date('2024-10-26');
    expect(formatDate(date)).toBe('October 26, 2024');
  });
});
