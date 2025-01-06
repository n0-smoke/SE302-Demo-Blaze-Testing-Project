const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pageObjectModels/dejanPOM');

test('User Log Out', async ({ page }) => {
    let homePage;
    homePage = new HomePage(page);
    await homePage.navigate();
    const username = 'SE302-LogOutTest';
    const password = 'logouttest';

    // User Login
    await homePage.login(username, password);
    await expect(page.locator(homePage.navbarUsername)).toHaveText(`Welcome ${username}`);

    // User Log Out
    await homePage.logout();
    await expect(page.locator(homePage.loginButton)).toBeVisible();   
});