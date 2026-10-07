import { test, expect } from '@playwright/test'
import { AccessToken } from './BaseTest'
import notes from '../TestData/create_notes.json'   // Import JSON directly

test.describe('Create Notes API Testing @smoke', () => {
  const baseUrl = 'https://practice.expandtesting.com'
  let token

  test.beforeAll(async ({ request }) => {
    token = await AccessToken("snehal@asd.com", "Avantika1#", request)
    expect(token).toBeTruthy()
  })

 // for (let note of notes) {
  notes.forEach((note, index) => {
    test(`POST Request - Create Note ${index + 1}: ${note.title}`, async ({ request }) => {
      const response = await request.post(`${baseUrl}/notes/api/notes`, {
        headers: {
          'x-auth-token': token,
        },
        data: note,
      })

      const responseBody = await response.json()
      console.log(responseBody)

      expect(response.status()).toBe(200)
      expect(responseBody.message).toBe('Note successfully created')
      expect(responseBody.data.title).toBe(note.title)
    })
  })
})
