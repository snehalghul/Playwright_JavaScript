const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');

const loginUrl = 'http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx';
const successUrl = 'http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Default.aspx';

const testData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'TestData', 'weborder_login.json'), 'utf8')
);

testData.forEach(({ test_case, username, password, expected_result }) => {
  test(`${test_case}: WebOrders login with username and password from JSON`, async ({ page }) => {
    await page.goto(loginUrl);
    await expect(page).toHaveURL(/\/Login\.aspx/);

    await page.getByRole('textbox', { name: 'Username:' }).fill(username);
    await page.getByRole('textbox', { name: 'Password:' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    if (expected_result === 'Logout') {
      await expect(page).toHaveURL(successUrl);
      await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    } else {
      await expect(page).toHaveURL(loginUrl);
      await expect(page.getByText(expected_result)).toBeVisible();
    }
  });
});
