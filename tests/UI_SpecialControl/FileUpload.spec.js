//import { test, expect } from require('@playwright/test');
import { test, expect } from '@playwright/test';
//const MultipleFile = ["tests/TestData/Images/Abhi.jpg","tests/TestData/WebOrder_Login.json"]
test('Flight Upload', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload')
        await page.waitForLoadState()
        //Loading Image file
        
        const filepath = 'tests/TestData/OrangeHRM_Login.csv'
        //console.log(filepath)
        await page.locator('#file-upload').setInputFiles(filepath)
        await page.locator('#file-submit').click()
        //await page.waitForTimeout(5000)
        //await page.locator('#file-submit').click({timeout:5000})
        await page.waitForSelector("//h3[normalize-space()='File Uploaded!']")
        //await page.waitForTimeout(5000) // Wait for 5 seconds
        await expect(page.locator('#uploaded-files')).toHaveText('OrangeHRM_Login.csv')
        await page.waitForTimeout(5000) // Wait for 5 seconds
    })
