//import { expect, Locator, Page } from '@playwright/test'
import { expect, Locator, Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class ForgotPassword {
//exports.LoginPage = class LoginPage {
  // Define selectors
  // readonly page: Page
  ForgetpasswordLink = Locator
  emailTextboxInput = Locator
  submitButton = Locator
  errorMessage = Locator
  
  // Init selectors using constructor
  constructor(page = Page) {
    // this.page = page
    super(page)
    this.ForgetpasswordLink = page.getByRole('textbox', { name: 'Login' }) //page.locator('#user_login')
    this.emailTextboxInput = page.locator('#user_password')
    this.submitButton = page.locator('text=Sign in')
    this.ForgottenPasswordHeader = page.locator('.alert-error')
    this.passwordSentMsgText = page.locator("a[href='/forgot-password.html']") 
    
  }

  async enterLogintext(logintext = string) {
    await this.usernameInput.type(logintext)
  }

  async enterPassword(password = string) {
    await this.passwordInput.type(password)
  }

  async clickOnSignInButton() {
    await this.submitButton.click()
  }

  async clickOnKeepMeSignedIn() {
    await this.keepmesignedin.check()
  }

  // Define login page methods
  async login(username, password) {
    await this.usernameInput.type(username) 
    await this.passwordInput.type(password)
    await this.submitButton.click() 

  }

   async loginwithSignedIn(username = string, password = string) {
    await this.usernameInput.type(username)
    await this.passwordInput.type(password)
    await this.keepmesignedin.check()
    await this.submitButton.click()
    
  }

  async assertLoginTitleText() {
    await expect(this.LogInToZeroBanktext).toHaveText('Log in to ZeroBank')
  }
  async assertErrorMessage() {
    await expect(this.errorMessage).toContainText('Login and/or password are wrong.')
  }

  async clickonForgetPasswordLink() {
    await this.Forgetpassword.click()
  }
}
