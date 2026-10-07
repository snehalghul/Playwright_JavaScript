//import { test, expect } from require('@playwright/test');
import { test, expect } from '@playwright/test';

test('Right Clieck', async ({ page }) => {
    await page.goto("http://swisnl.github.io/jQuery-contextMenu/demo.html");
   // Right Click on Button
    await page.locator("//span[text()='right click me']").click({ button: 'right' });
    await page.waitForTimeout(5000)
    await page.locator('.context-menu-list.context-menu-root').click()
    //await page.dblclick('.context-menu-icon-edit > span')
    await page.waitForTimeout(5000)
});