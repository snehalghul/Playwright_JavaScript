import { test, expect } from '@playwright/test'

test.describe('Create Token - API Testing @smoke', () => {
  const baseUrl = 'https://practice.expandtesting.com'

    test('Login as an existing user', async ({ request }) => {

    const response = await request.post(`${baseUrl}/notes/api/users/login`, {
      data: {
        "email": "snehal@asd.com",
        "password": "Avantika1#"
      },
    })

    await console.log(response)
    const responseBody = await response.json()
    //const responseBody = JSON.parse(await response.text())
    console.log(responseBody)
    expect(response.status()).toBe(200)
    expect(responseBody.message).toBe('Login successful')
    expect(responseBody.data.token).toBeTruthy()
    expect(responseBody.data.email).toBe('testing@abc.com')
    const token = responseBody.data.token
    console.log(token)
    
  })
})