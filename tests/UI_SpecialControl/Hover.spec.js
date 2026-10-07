import { test, expect } from '@playwright/test';

test('Flipcart Login Page Mouse Hover', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  //await page.click("//span[@role='button']");
  await page.locator("//span[@role='button']").click()
  await page.waitForLoadState('networkidle');
  await page.hover("//span[normalize-space()='Login']")
  //await page.getByText('Login', { exact: true }).hover();
  await page.locator("//li[normalize-space()='My Profile']").click()
  //await page.click("//li[normalize-space()='My Profile']");
  await expect(page.locator("//button[normalize-space()='Request OTP']")).toHaveText("Request OTP")
  await expect(page.locator("//button[normalize-space()='Request OTP']")).toBeVisible()
  await page.waitForTimeout(5000)
});

test.only('Demo WebShop-Computer Mouse Hover', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await page.locator("//ul[@class='top-menu']//a[normalize-space()='Computers']").hover();
  await page.locator("//ul[@class='sublist firstLevel active']//a[normalize-space()='Notebooks']").click()
  await expect(page).toHaveURL("https://demowebshop.tricentis.com/notebooks")
  await page.waitForTimeout(5000)
});