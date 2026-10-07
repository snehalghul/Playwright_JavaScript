// Include playwright module
import { test, expect } from '@playwright/test';

// Write a test
test('Date Picker using iframe in playwright', async({page}) =>{
    // Go to URL
    await page.goto('https://jqueryui.com/datepicker/')
    await page.frameLocator('.demo-frame').locator('.hasDatepicker').fill('12/20/2026');
    await page.waitForTimeout(5000);

})

    
// // Write a test
test.only('Date Picker in playwright', async({page}) =>{
    // Go to URL
    await page.goto('https://jqueryui.com/datepicker/')
    const frameElement = page.frameLocator('.demo-frame');
    frameElement.locator('.hasDatepicker').click();

    // custom date value
    const defaultDate = frameElement.locator('.ui-datepicker-today > a')
    //await defaultDate.click();
    const currentDateValue = await defaultDate.getAttribute('data-date'); // 22 as a value
    let customDate = (parseInt(currentDateValue)); // 25 as value
    const element = "[data-date="+"'"+customDate.toString()+"'"+"]";
    console.log(element); // data-date='25'
    await frameElement.locator(element).click();
    await page.waitForTimeout(5000);

})

    