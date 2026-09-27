require('dotenv').config();

const { test, expect } = require('@playwright/test');

const email = process.env.LOGIN_EMAIL;
const password = process.env.LOGIN_PASSWORD;

test('Login with registered user', async ({ page }) => {

    // 1. Launch website
    await page.goto('https://www.automationexercise.com/');

    // 2. Navigate to Login page
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // 3. Enter registered email and password
    const loginForm = page.locator('form').filter({
        has: page.getByRole('button', { name: 'Login' })
    });

    await loginForm.locator('input[type="email"]').fill(email);
    await loginForm.locator('input[type="password"]').fill(password);

    // 4. Submit login form
    await loginForm.getByRole('button', { name: 'Login' }).click();

    // 5. Verify successful login
    await expect(page.getByText('Logged in as')).toBeVisible();
});