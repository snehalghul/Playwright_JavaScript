import { test, expect } from "@playwright/test";
import { AccessToken } from "./BaseTest";
test.describe("Create Notes API Testing", () => {
  const baseUrl = "https://practice.expandtesting.com";
  var token;
  const random_title = "Playwright_Notes " + Math.random() * 1000;
  
  test.beforeAll(async ({ request }) => {
    token = await AccessToken(
      "snehal@asd.com",
      "Avantika1#",
      request
    );
    expect(token).toBeTruthy();
  });

  test("POST Request - Create Notes", async ({ request }) => {
    const response = await request.post(`${baseUrl}/notes/api/notes`, {
      headers: {
        "x-auth-token": `${token}`,
      },
      data: {
        title: random_title,
        description: "Done via API",
        category: "Personal",
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);
    expect(responseBody.message).toBe("Note successfully created");
    expect(responseBody.data.title).toBe(random_title);
    console.log(random_title);
  });
  test("Delete test using UI", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/notes/app/login");
    //await page.getByRole("link", { name: "Login" }).click();
    await page.locator("#email").fill("snehal@asd.com");
    await page.locator("#password").fill("Avantika1#");
    await page.getByRole("button", { name: "Login" }).click();
    // Wait for notes to load
    await page.waitForSelector(".container");
    // Delete the note with the random title
    const noteDeleteButton = page.locator(
      `//div[text()='${random_title}']//following-sibling::div/div/button[normalize-space()='Delete']`
    );
    await expect(noteDeleteButton).toBeVisible({ timeout: 50000 });
    await noteDeleteButton.click();
    await page.locator("//button[@type='button'][normalize-space()='Delete']").click();
    // Verify the note is deleted
    await expect(page.locator(`//div[text()='${random_title}']`)).toHaveCount(0);
  });
});
