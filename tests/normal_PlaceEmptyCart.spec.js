const { test, expect } = require('@playwright/test');
const CartPage = require('../pageObjectModels/hamPOM');

test('Attempt to place an order with an empty cart', async ({ page }) => {
    const cartPage = new CartPage(page);

    // Step 1: Navigate to the cart page
    await cartPage.navigateToCart();

    // Step 2: Ensure the cart is empty
    const isEmpty = await cartPage.isCartEmpty();
    if (!isEmpty) {
        await cartPage.clearCart(); // Clear the cart if not empty
    }
    const isCartEmptyAfterClear = await cartPage.isCartEmpty();
    expect(isCartEmptyAfterClear).toBe(true);

    // Step 3: Try placing an order
    await cartPage.clickPlaceOrder();

    // Step 4: Verify that no confirmation message appears
    const confirmationVisible = await cartPage.confirmationMessage.isVisible().catch(() => false);
    expect(confirmationVisible).toBe(false); // Expect no confirmation message
});
