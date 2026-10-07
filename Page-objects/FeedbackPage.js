//import { expect, Locator, Page } from '@playwright/test'
import { expect, Locator, page } from '@playwright/test';
export class FeedbackPage {
   page= page
   nameInput= Locator
   emailInput= Locator
   subjectInput= Locator
   commentInput= Locator
   clearButton= Locator
   submitButton= Locator
   feedbackTitle= Locator
   feedbackFormSentMessage= Locator
   
  constructor(page= this.page) {
    //this.page = page
    this.page = page
    this.nameInput = page.getByPlaceholder('Your Name')
    this.emailInput = page.locator('#email')
    this.subjectInput = page.locator('#subject')
    this.commentInput = page.locator('#comment')
    this.clearButton = page.locator("input[name='clear']")
    this.submitButton = page.locator("input[type='submit']")
    this.feedbackTitle = page.locator('#feedback-title')
    this.feedbackFormSentMessage = page.locator('#content > div > div > div > p')
  }

  async fillForm(
    name= string,
    email= string,
    subject= string,
    comment= string
  ) {
    await this.nameInput.type(name)
    await this.emailInput.type(email)
    await this.subjectInput.type(subject)
    await this.commentInput.type(comment)
    
  }

  async resetForm() {
    await this.clearButton.click()
  }

  async submitForm() {
    await this.submitButton.click()
  }

  async assertReset() {
    await expect(this.nameInput).toBeEmpty()
    await expect(this.commentInput).toBeEmpty()
    await expect(this.emailInput).toBeEmpty()
    await expect(this.subjectInput).toBeEmpty()
  }

  async verifyFeedbackTitle() {
    await expect(this.feedbackTitle).toBeVisible()
  }

  async assertFeedbackFormSentMessage(yourname= string) {
    await expect(this.feedbackFormSentMessage).toContainText(
      `Thank you for your comments ${yourname}, . They will be reviewed by our Customer Service staff and given the full attention that they deserve.`
    )
  }
}
