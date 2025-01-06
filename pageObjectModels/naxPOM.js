class DemoBlazeContactPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators for the contact functionality
        this.contactLink = page.locator('a:has-text("Contact")'); // Contact link in the navigation bar
        this.contactModal = page.locator('#exampleModal'); // Contact modal
        this.contactEmailInput = page.locator('#recipient-email'); // Email input field
        this.contactNameInput = page.locator('#recipient-name'); // Name input field
        this.contactMessageInput = page.locator('#message-text'); // Message textarea
        this.sendMessageButton = page.locator('button:has-text("Send message")'); // Send message button
    }

    // Open demoblaze.com
    async navigateToHome() {
        await this.page.goto('https://www.demoblaze.com');
    }

    // Open the contact modal
    async openContactModal() {
        await this.contactLink.click();
        await this.contactModal.waitFor({ state: 'visible' });
    }

    /**
     * Fill the contact form with provided information
     * @param {Object} contactDetails - Details for contacting DemoBlaze
     * @param {string} contactDetails.email - Contact email address
     * @param {string} contactDetails.name - Contact name
     * @param {string} contactDetails.message - Contact message
     */
    async fillContactForm({ email, name, message }) {
        if (email) await this.contactEmailInput.fill(email);
        if (name) await this.contactNameInput.fill(name);
        if (message) await this.contactMessageInput.fill(message);
    }

    /**
     * Send the contact message
     */
    async sendContactMessage() {
        await this.sendMessageButton.click();

        // Handle the browser dialog (alert) confirming the action
        this.page.once('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept();
        });
    }
}

module.exports = DemoBlazeContactPage;