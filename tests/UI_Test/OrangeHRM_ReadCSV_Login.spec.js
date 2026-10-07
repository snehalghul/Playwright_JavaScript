//Run "npm install csv" to install the full csv module or run npm install csv-parse 
//if you are only interested by the CSV parser.

import { readFileSync } from 'fs';
import { test, expect } from '@playwright/test';
import { parse } from 'csv-parse/sync';

const records = parse(readFileSync('./tests/TestData/OrangeHRM_Login.csv'), {
  columns: true,
  skip_empty_lines: true
});

for (const record of records) {
  test(`OrangeHRM Login: ${record.test_case} @smoke`, async ({ page }) => {
    console.log(record.uname, record.upass, record.exp_result);

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill(record.uname);
    await page.getByPlaceholder('Password').fill(record.upass);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForSelector("//h6[text()='Dashboard']")
    //Verify the Expected vs Actual
    //await page.waitForTimeout(5000)
    const Dashboard = page.locator("//h6[text()='Dashboard']")
    await expect(Dashboard).toHaveText(record.exp_result)
    //Logout from the application
    await page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']").click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
  });
}
