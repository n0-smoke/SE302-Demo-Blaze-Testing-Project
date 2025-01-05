const { test, expect } = require('@playwright/test');
const { HomePage, CartPage } = require('../pageObjectModels/adnaPOM');

test('Removing item from the cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    //few lines below make sure that there is something in the cart before trying to remove
    await homePage.goTo(); // Navigates to the Home page

    await page.waitForTimeout(4000);
    const firstProduct = page.locator(".card-title a").first();
    await firstProduct.click(); // Clicks on the first item product that is found on the Home page

    const addToCartButton = page.locator("a:has-text('Add to cart')");
    await addToCartButton.click(); //Adds that item to the cart
    await page.waitForTimeout(4000); // Waits for "Product added" pop up

    await cartPage.goToCart(); //Navigates to the Cart page
    let cartItems = await cartPage.getCartItems(); //Puts all items from the cart in a list
    expect(cartItems.length).toBeGreaterThan(0); // List is expected to have more than 0 items

    await cartPage.removeFirstItem(); //Removes the first item from the cart

    // Verifies that the item is deleted
    cartItems = await cartPage.getCartItems(); //Puts all the items from cart in a list
    expect(cartItems.length).toBe(0); //After deletion, there should be 0 items
});
