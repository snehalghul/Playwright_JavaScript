import { expect, test } from "@playwright/test";

test("OrangeHRM Window ", async ({page}) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    console.log(page.url());
    // Multiple Windows
    const [multiPage] = await Promise.all([
        //Wait for popup window: this is not javascript alert or window alert
        page.waitForEvent("popup"),
        page.locator("a[href='http://www.orangehrm.com']").click()
        //page.click("a[href='http://www.orangehrm.com']")
    ])
    //It often happens that before all the pages get loaded completely,
    // the browsers get closed. To fix this issue, use a function that 
    //says “waitForLoadState.” This function ensures that the browser 
    //waits until all the pages are loaded
    await multiPage.waitForLoadState();
 
    // const pages = multiPage.context().pages();

    // //Interacting with multiple pages in Playwright
    // let OrangeHRMPage
    // for (let index = 0; index < pages.length; index++) {
    //     const url = pages[index].url()
    //     if (url == "https://www.orangehrm.com/") {
    //         OrangeHRMPage = pages[index];
            
    //     }
    // }
    const text = await multiPage.locator("h1").textContent();
     console.log(text);
    //console.log(OrangeHRMPage.url());
    await multiPage.locator("//button[contains(text(),'Contact Sales')]").click();
    await page.waitForTimeout(5000);
    //console.log(text);
    await multiPage.close();
    await page.waitForTimeout(5000);
    await page.getByText('Forgot your password?', { exact: true }).click();
    await page.waitForTimeout(5000);
});