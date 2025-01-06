const { test, expect } = require('@playwright/test');
const DemoBlazeContactPage = require('../pageObjectModels/naxPOM');

test('Contact DemoBlaze without valid information', async ({ page }) => {
    const demoBlazeContact = new DemoBlazeContactPage(page);

    await demoBlazeContact.navigateToHome();

    // Open the contact modal
    await demoBlazeContact.openContactModal();

    // There are no input values for the contact form
    const contactDetails = {
        email: '   ',
        name: '      ',
        message: ' ',
    };


await demoBlazeContact.fillContactForm(contactDetails);

   // Send the contact message
   await demoBlazeContact.sendContactMessage();


});
