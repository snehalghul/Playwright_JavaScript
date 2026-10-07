import { test, expect } from '@playwright/test';

export class Login_LogoutPage {

  constructor(page) {
    this.page = page;
    this.InputUserName = this.page.getByLabel("Username:");
    this.InputPassword = this.page.getByLabel("Password:");
    this.LoginButton = this.page.locator("//input[@id='ctl00_MainContent_login_button']");
     this.InputUserName_O = this.page.getByPlaceholder('Username');
    this.InputPassword_O = this.page.getByPlaceholder('Password');
    this.LoginButton_O = this.page.getByRole('button', { name: 'Login' });
    this.Logout_O = this.page.getByRole('menuitem', { name: 'Logout' });
    this.Logout = this.page.locator("//a[text()='Logout']");
    this.icon = this.page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']");
  }

   async verifyURL(url) {
    await expect(this.page).toHaveURL(url);
  }

  async gotoAPPURL(url) {
    await this.page.goto(url);
  }

  async gotoURL() {
    await this.page.goto('http://secure.smartbearsoftware.com/samples/testcomplete11/WebOrders/login.aspx');
  }

  async LoginToApp(uname, pass) {
    await this.InputUserName.fill(uname);
    await this.InputPassword.fill(pass);
    await this.LoginButton.click(); 
  }

  async LoginToAppOrangHRM(uname,pass) {
    await this.InputUserName_O.fill(uname);
    await this.InputPassword_O.fill(pass);
    await this.LoginButton_O.click(); 
  }

  async LogoutFromApp() {
    //await this.icon.click()
    await this.Logout.click()
  }

    async LogoutFromAppOrangHRM() {
    await this.icon.click()
    await this.Logout_O.click()
  }
  
  }
  
  