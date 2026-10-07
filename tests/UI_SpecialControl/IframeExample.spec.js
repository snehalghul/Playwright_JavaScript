import { test, expect } from '@playwright/test';
test('Date Picker using iframe in playwright', async({page}) =>{
    // Go to URL
    await page.goto('https://jqueryui.com/datepicker/')
    await page.frameLocator('.demo-frame').locator('.hasDatepicker').fill('12/20/2026');
    //await page.locator('.hasDatepicker').fill('12/20/2026');
    await page.waitForTimeout(5000);

})