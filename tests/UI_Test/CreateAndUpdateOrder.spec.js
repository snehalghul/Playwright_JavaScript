import { test, expect } from '@playwright/test';


test('VerifyUpdateWeborder', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');
  await page.getByRole('textbox', { name: 'Username:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Username:' }).fill('T');
  await page.getByRole('textbox', { name: 'Username:' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Username:' }).fill('Tester');
  await page.getByRole('textbox', { name: 'Username:' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password:' }).fill('test');
  await page.getByRole('button', { name: 'Login' }).click()
await expect(page.locator("h2")).toContainText("List of All Orders")
  //Create Order
  await page.getByRole('link', { name: 'Order', exact: true }).click();
  await page.getByRole('combobox', { name: 'Product:*' }).selectOption('FamilyAlbum');
  await page.getByLabel('Quantity:*').fill('5'); 
  // Random User name generation
  const ExpUserName = 'Megha' + Math.random() * 1000000;

  await page.getByLabel('Customer name:*').fill(ExpUserName);
  await page.getByLabel('Street:*').fill('BTM')
  //await page.getByLabel('Street:*').isEditable().fill('BTM');
  await page.getByLabel('City:*').fill('Bangalore');
  await page.getByLabel('Zip:*').click();
  await page.getByLabel('Zip:*').fill('560076');
  await page.getByLabel('Visa').check();
  await page.getByLabel('Card Nr:*').click();
  await page.getByLabel('Card Nr:*').fill('1234567891');
  await page.getByLabel('Expire date (mm/yy):*').fill('12/23');
  await page.getByRole('link', { name: 'Process' }).click();
 
  const neworder = await page.locator("//strong[normalize-space()='New order has been successfully added.']")
  await expect(neworder).toContainText('New order has been successfully added.')

  await page.getByRole('link', { name: 'View all orders' }).click();
  // Verify that user got created
  await expect(page.getByText(ExpUserName)).toHaveText(ExpUserName)
 // await expect(page.locator("//td[normalize-space()='"+ExpUserName+"']")).toHaveText(ExpUserName)

  // Update the Order details

  await page.locator("//td[normalize-space()='"+ExpUserName+"']//following-sibling::td/input[@type='image']").click();
  await page.waitForTimeout(3000)
  await page.locator('#ctl00_MainContent_fmwOrder_TextBox3').clear()
  await page.locator('#ctl00_MainContent_fmwOrder_TextBox3').fill('Delhi')
  await page.locator("#ctl00_MainContent_fmwOrder_UpdateButton").click()
  await page.waitForTimeout(3000);
  //Verify that City value change to Delhi
  //await page.waitForSelector("//td[normalize-space()='"+ExpUserName+"']//following-sibling::td[text()='Delhi']")
  await expect(page.locator("//td[normalize-space()='"+ExpUserName+"']//following-sibling::td[text()='Delhi']")).toHaveText("Delhi")
  //Logout
  await page.getByRole('link', { name: 'Logout' }).click()
  await expect(page).toHaveURL("http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx")
});