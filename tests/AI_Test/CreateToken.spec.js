const { test, expect } = require('@playwright/test');

test('Create token with valid credentials', async ({ request }) => {
  const response = await request.post(
    'https://practice.expandtesting.com/notes/api/users/login',
    {
      form: {
        email: 'testing@abc.com',
        password: 'pass1234'
      }
    }
  );

  const responseBody = await response.json();

  expect(response.status()).toBe(200);
  expect(responseBody.success).toBe(true);
  expect(responseBody.status).toBe(200);
  expect(responseBody.message).toBe('Login successful');
  expect(responseBody.data.id).toBe('68b0018b6f7da0028a4b2976');
  expect(responseBody.data.name).toBe('Dixit');
  expect(responseBody.data.email).toBe('testing@abc.com');
  expect(responseBody.data.token).toBeTruthy();
  expect(responseBody.data.token).toMatch(/^[a-f0-9]{64}$/);
});
