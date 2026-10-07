import { test, expect } from '@playwright/test';

test('OrangeHRM_AddUser_VerifyUser @smoke', async ({ page }) => {
    const d = new Date();
    let ms = d.getTime();
    const ExpUserName = 'DemoUser' + ms;
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading')).toContainText('Dashboard');
  //Add User
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page.getByRole('heading', { name: '/ User Management' })).toBeVisible();
  await page.getByRole('heading', { name: '/ User Management' }).click();
  await page.getByRole('button', { name: ' Add' }).click();
  await page.getByText('-- Select --').first().click();
  await page.locator('form').getByText('Admin').click();
//   await page.getByText('-- Select --').first().click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).fill('a');
  await page.waitForTimeout(5000)
  await page.getByRole('textbox', { name: 'Type for hints...' }).press('ArrowDown');
  await page.getByRole('textbox', { name: 'Type for hints...' }).press('Enter');
  await page.waitForTimeout(5000)
await page.getByText('-- Select --').click();
await page.getByText('Enabled').click();
//   await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill(ExpUserName);
//   await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('admin123');
  await page.getByRole('textbox').nth(4).fill('admin123');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(6000);
  await expect(page.locator("//div[text()='" + ExpUserName + "']")).toContainText(ExpUserName)
  //await expect(page.getByRole('table')).toContainText('ExpUserName');
});
  
