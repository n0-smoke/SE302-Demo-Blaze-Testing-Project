const { test, expect } = require('@playwright/test');
const DemoBlazePage = require('../pageObjectModels/ammPOM');

test('Fill all input fields and complete a purchase', async ({ page }) => {
    const demoBlaze = new DemoBlazePage(page);

    
    await demoBlaze.navigateToCart(); // Open the the cart page

    // These are the input values (so all input fields are filled)
    const orderDetails = {
        name: 'Joe Schmoe',
        country: 'Bosnia',
        city: 'Sarajevo',
        creditCard: '12345678',
        month: 'February',
        year: '2025',
    };
    await demoBlaze.placeOrder(orderDetails);

    // Now we will see if the confirmation message exists, and if so is it
    // "Thank you for your purchase!"
    const confirmationMessage = await demoBlaze.getConfirmationMessage();
    expect(confirmationMessage).toBe('Thank you for your purchase!');
});
