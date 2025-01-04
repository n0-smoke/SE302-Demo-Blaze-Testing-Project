const { test, expect } = require('@playwright/test');
const DemoBlazePage = require('../pageObjectModels/ammPOM');

test('Handle trying to purchase a cart without filling input prompts', async ({ page }) => {
    const demoBlaze = new DemoBlazePage(page);

    
    await demoBlaze.navigateToCart(); // Open the cart page

    // This is setting the input variable for the purchase to be empty
    const emptyOrderDetails = {
        name: '',
        country: '',
        city: '',
        creditCard: '',
        month: '',
        year: '',
    };
    await demoBlaze.placeOrder(emptyOrderDetails);

    // Checking to see if the confirmation message doesn't appear, if so, the test passes
    const confirmationVisible = await demoBlaze.confirmationMessage.isVisible({ timeout: 5000 }).catch(() => false);
    expect(confirmationVisible).toBe(false); // Expect the confirmation message to NOT appear
});
