const { test, expect } = require('@playwright/test');
const { HomePage, CartPage } = require('../pageObjectModels/dejanPOM');

test('Cart persists after logout and login', async ({ page }) => {
  let homePage;
  let cartPage;
  homePage = new HomePage(page);
  cartPage = new CartPage(page);
  await homePage.navigate();
  const username = 'CartPersistanceTest';
  const password = 'cart';

    // Login
    await homePage.login(username, password);
    await expect(page.locator(homePage.navbarUsername)).toHaveText(`Welcome ${username}`);

    // Navigates to the Home page
    await homePage.navigate();
    await page.waitForTimeout(4000);

    // Clicks on the first item product that is found on the Home page
    const firstProduct = page.locator(".card-title a").first();
    await firstProduct.click(); 
  
    // Adds that item to the cart
    const addToCartButton = page.locator("a:has-text('Add to cart')");
    await addToCartButton.click();
    await page.waitForTimeout(4000);

    // Navigates to the Cart page and checks which items are there
    await cartPage.goToCart();
    const cartItems = await cartPage.getCartItems();

    // User Logout
    await homePage.logout();

    // User Logs In Again
    await homePage.login(username, password);
    await expect(page.locator(homePage.navbarUsername)).toHaveText(`Welcome ${username}`);

    //Navigates to the Cart page and checks if items are still there
    await homePage.navigate();
    await cartPage.goToCart(); 
    expect(cartItems.length).toBeGreaterThan(0);
});
