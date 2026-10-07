// @ts-check
import { test, expect } from '@playwright/test';

test('Scroll To Particular Element Example @sanity', async ({ page }) => {
  //test.setTimeout(800000)
  await page.goto('https://demowebshop.tricentis.com/');
  const element = page.locator(".account")
  await element.scrollIntoViewIfNeeded();
  await element.click()
  await page.waitForTimeout(5000)
});

test.only('Scroll To Particular Element Flipcart @sanity', async ({ page }) => {
  //test.setTimeout(800000)
  await page.goto('https://www.flipkart.com/');
  await page.locator("//span[@role='button']").click()
  const element = await page.getByRole('link', { name: 'Contact Us' })
  await element.scrollIntoViewIfNeeded();
  await element.click()
  await page.waitForTimeout(5000)
});