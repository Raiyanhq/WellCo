// src/__tests__/api.test.js
import { fetchWellCoData } from '../api/api';

describe('API Functions', () => {
  test('fetches WellCo data successfully', async () => {
    const data = await fetchWellCoData();
    expect(data).toHaveProperty('message');
    expect(data.message).toBe('Success'); // Adjust based on your expected response structure
  });

  test('handles fetch errors', async () => {
    // Mock fetch to simulate an error
    global.fetch = jest.fn(() => Promise.reject('API Error'));

    await expect(fetchWellCoData()).rejects.toEqual('API Error');
  });
});
