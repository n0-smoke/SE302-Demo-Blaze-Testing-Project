class DemoBlazePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators for the normal_Navigation
        this.monitorsCategory = page.locator('a:has-text("Monitors")'); // Monitors category link
        this.asusFullHDLink = page.locator('a:has-text("ASUS Full HD")'); // ASUS Full HD product link
        this.productTitle = page.locator('.name'); // Product title on the product page

        // Locators for normal_ValidInfoPurchase and normal_InvalidInfoPurchase
        this.placeOrderButton = page.locator('button:has-text("Place Order")'); // Place Order button
        this.purchaseModal = page.locator('#orderModal'); // Order modal
        this.nameInput = page.locator('#name'); // Name input in the order modal
        this.countryInput = page.locator('#country'); // Country input
        this.cityInput = page.locator('#city'); // City input
        this.creditCardInput = page.locator('#card'); // Credit card input
        this.monthInput = page.locator('#month'); // Month input
        this.yearInput = page.locator('#year'); // Year input
        this.purchaseButton = page.locator('button:has-text("Purchase")'); // Purchase button
        this.confirmationMessage = page.locator('.sweet-alert h2'); // Confirmation message after purchase

        //Addint item to cart
        this.addToCartButton = page.locator('a:has-text("Add to cart")'); // Add to cart button
    }

    // Open demoblaze.com
    async navigateToHome() {
        await this.page.goto('https://www.demoblaze.com');
    }

    // Click on monitors category
    async selectMonitorsCategory() {
        await this.monitorsCategory.click();
    }

    // Click on ASUS FUll HD
    async selectAsusFullHD() {
        await this.asusFullHDLink.click();
    }

    /**
     * Get the title of the opened product
     * @returns {Promise<string>} - The title of the product
     */
    async getProductTitle() {
        return await this.productTitle.textContent();
    }

    // Open the cart page
    async navigateToCart() {
        await this.page.goto('https://www.demoblaze.com/cart.html');
    }

    /**
     * Placing an order by filling the form and submitting
     * @param {Object} orderDetails - The details for the order
     * @param {string} orderDetails.name - Customer's name
     * @param {string} orderDetails.country - Customer's country
     * @param {string} orderDetails.city - Customer's city
     * @param {string} orderDetails.creditCard - Customer's credit card number
     * @param {string} orderDetails.month - Month of purchase
     * @param {string} orderDetails.year - Year of purchase
     */
    async placeOrder({ name, country, city, creditCard, month, year }) {
        await this.placeOrderButton.click();
        await this.purchaseModal.waitFor({ state: 'visible' });

        // Filling the form fields
        await this.nameInput.fill(name);
        await this.countryInput.fill(country);
        await this.cityInput.fill(city);
        await this.creditCardInput.fill(creditCard);
        await this.monthInput.fill(month);
        await this.yearInput.fill(year);

        // Submiting the form by clickin on purchase button
        await this.purchaseButton.click();
    }

    /**
     * Get the confirmation message after purchase
     * @returns {Promise<string>} - The confirmation message text
     */
    async getConfirmationMessage() {
        return await this.confirmationMessage.textContent();
    }

    /**
     * Add the selected product to the cart
     */
    async addToCart() {
        await this.addToCartButton.click();
        // Handle the browser dialog (alert) that confirms adding to the cart
        this.page.once('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept();
        });
    }
}

module.exports = DemoBlazePage;
