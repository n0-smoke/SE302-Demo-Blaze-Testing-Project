const { test, expect } = require('@playwright/test');
const DemoBlazeContactPage = require('../pageObjectModels/naxPOM');

test('Contact DemoBlaze with valid information', async ({ page }) => {
    const demoBlazeContact = new DemoBlazeContactPage(page);

    await demoBlazeContact.navigateToHome();

    // Open the contact modal
    await demoBlazeContact.openContactModal();

    // These are the input values for the contact form
    const contactDetails = {
        email: 'testuser@example.com',
        name: 'Don Johnson',
        message: 'I have a query regarding one of your products.',
    };

    // Fill the contact form
await demoBlazeContact.fillContactForm(contactDetails);

   // Send the contact message
   await demoBlazeContact.sendContactMessage();


});
