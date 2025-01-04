class CartPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Locators for the cart
        this.cartTable = page.locator('#tbodyid'); // Table body containing cart items
        this.cartRows = page.locator('#tbodyid tr'); // Rows within the cart table
        this.placeOrderButton = page.locator('button:has-text("Place Order")'); // Place Order button
        this.purchaseModal = page.locator('#orderModal'); // Order modal
        this.confirmationMessage = page.locator('.sweet-alert h2'); // Confirmation message
        this.deleteButtons = page.locator('#tbodyid tr td:nth-child(4) a'); // Delete buttons
    }

    /**
     * Navigate to the cart page
     */
    async navigateToCart() {
        await this.page.goto('https://www.demoblaze.com/cart.html');
    }

   /**
     * Check if the order modal is visible
     * @returns {Promise<boolean>} - True if the modal is visible, false otherwise
     */
    async isModalVisible() {
        const displayValue = await this.page.locator('#orderModal').getAttribute('style');
        if (!displayValue) {
            return false; // Return false if the attribute doesn't exist
        }
        return displayValue.includes('display: block');
    }

    /**
     * Check if the cart is empty
     * @returns {Promise<boolean>} - True if the cart is empty, false otherwise
     */
    async isCartEmpty() {
        const rowCount = await this.cartRows.count();
        return rowCount === 0; // If no rows, the cart is empty
    }

    /**
     * Get the items in the cart
     * @returns {Promise<string[]>} - Array of product names in the cart
     */
    async getCartItems() {
        const items = [];
        const rowCount = await this.cartRows.count();

        for (let i = 0; i < rowCount; i++) {
            const itemName = await this.cartRows.nth(i).locator('td:nth-child(2)').textContent();
            items.push(itemName.trim());
        }

        return items;
    }

    /**
     * Click the "Place Order" button
     */
    async clickPlaceOrder() {
        await this.placeOrderButton.click();
    }

    /**
     * Get the confirmation message after placing an order
     * @returns {Promise<string>} - Confirmation message text
     */
    async getConfirmationMessage() {
        return await this.confirmationMessage.textContent();
    }

    /**
     * Delete all items from the cart
     */
    async clearCart() {
        const deleteCount = await this.deleteButtons.count();
        for (let i = 0; i < deleteCount; i++) {
            await this.deleteButtons.nth(0).click();
            await this.page.waitForTimeout(500); // Allow some time for the cart to refresh
        }
    }
}

module.exports = CartPage;
