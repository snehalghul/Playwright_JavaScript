import { test, expect } from '@playwright/test';
import { AccessToken, deleteAllNotes } from './BaseTest.js';

const baseUrl = 'https://practice.expandtesting.com';

let outh_token;
let rand_title;

test.describe('Delete All Notes Before Creating', () => {
  test.beforeAll(async ({ request }) => {
    outh_token = await AccessToken('snehal@asd.com', 'Avantika1#', request);
    await deleteAllNotes(outh_token, request);
  });

  test('Create Notes', async ({ request }) => {
    // Generate random title
    rand_title = 'API_Testing' + Math.floor(Math.random() * 100000);

    const response = await request.post(`${baseUrl}/notes/api/notes`, {
      headers: {
        //'Content-Type': 'application/json',
        'x-auth-token': outh_token
      },
      data: {
        title: rand_title,
        description: 'Done via Playwright',
        category: 'Home'
      }
    });

    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.message).toBe('Note successfully created');
    expect(responseBody.data.title).toBe(rand_title);
  });
});
