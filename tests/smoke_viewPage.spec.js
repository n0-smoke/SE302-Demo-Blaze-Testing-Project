const { test, expect } = require('@playwright/test');
const { HomePage, CartPage } = require('../pageObjectModels/adnaPOM');

test('Homepage components load successfully', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goTo(); // Navigates to the Home page

    // Logic behind this test is to check if main components have loaded
    const logo = page.locator('.navbar-brand');
    await expect(logo).toBeVisible({ timeout: 5000 }); //checks visibility for logo

    const title = await page.title();
    expect(title).toBe('STORE'); // Checks visibility for title

    const navigation = page.locator('.navbar');
    await expect(navigation).toBeVisible({ timeout: 5000 }); //Checks visibility for navigation

});
