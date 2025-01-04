const { test, expect } = require('@playwright/test');
const CartPage = require('../pageObjectModels/hamPOM');
const DemoBlazePage = require('../pageObjectModels/ammPOM'); // For adding items

test('Place an order with items in the cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    const demoBlaze = new DemoBlazePage(page); // Use ammPOM.js to add items

    // Step 1: Navigate to the cart page
    await cartPage.navigateToCart();

    // Step 2: Ensure the cart has at least one item
    const isEmpty = await cartPage.isCartEmpty();
    if (isEmpty) {
        // Add an item to the cart if it's empty
        await demoBlaze.navigateToHome();
        await demoBlaze.selectMonitorsCategory();
        await demoBlaze.selectAsusFullHD();
        await demoBlaze.addToCart();
        await cartPage.navigateToCart(); // Go back to the cart

    }
    //const isCartEmptyAfterAdd = await cartPage.isCartEmpty();
    //expect(isCartEmptyAfterAdd).toBe(false);

    // Step 3: Place the order
    await cartPage.clickPlaceOrder();

    // Step 4: Verify that the order modal is visible
    await page.locator('#orderModal').waitFor({ state: 'visible' });
    const isModalVisible = await cartPage.isModalVisible();
    expect(isModalVisible).toBe(true); // Ensure the modal is visible
});
