import { test, expect } from '@playwright/test';
import db from './Database'

const sql = "select * from login";

test('DataBase testing in Playwright', async ({ page }) => {
    const rows = await db.queryDatabase(sql);

    for (const row of rows) {
        await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

        // Login
        await page.getByLabel('Username').fill(row.uname);
        await page.getByLabel('Password').fill(row.pass);
        await page.getByRole('button', { name: 'Login' }).click();
        // Logout
        await page.getByRole('link', { name: 'Logout' }).click();

        // --/.*\/WebOrders\/Login\.aspx.*/ is a regular expression (regex). 
        //In Playwright, it is often used with toHaveURL() when you don't want to match 
        // the entire URL exactly.
        await expect(page).toHaveURL(/.*\/WebOrders\/Login\.aspx.*/);
        //This means "verify that the current URL contains /WebOrders/Login.aspx, 
        // regardless of what comes before or after it."
        //await expect(page).toHaveURL("http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Default.aspx")
    }
    db.connection.end();
});