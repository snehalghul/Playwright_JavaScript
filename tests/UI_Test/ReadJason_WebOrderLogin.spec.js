import { readFileSync } from 'fs';
import { test, expect } from '@playwright/test';
// Reads the JSON file and saves it  
let objects = readFileSync('./tests/TestData/WebOrder_Login.json')
// console.log("objects:", objects);
// console.log("Type of objects:", typeof objects);
const users = JSON.parse(objects);
// console.log("users:", users);
// console.log("Type of users:", typeof users);
// console.log("Is Array:", Array.isArray(users));

for (const record of users) {
  test(`WebOrder Login: ${record.test_case}`, async ({ page }) => {
    //console.log(record.name, record.password, record.exp_result);
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
    await page.getByLabel('Username:').fill(record.uname);
    await page.getByLabel('Password:').fill(record.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('h2')).toContainText(record.exp_res);  
    await page.getByRole('link', { name: 'Logout' }).click();
    const login = page.locator('#ctl00_MainContent_login_button');
    await expect(login).toBeVisible();
    
});
}
