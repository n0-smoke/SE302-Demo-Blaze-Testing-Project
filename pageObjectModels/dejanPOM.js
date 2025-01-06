class HomePage {
    constructor(page) {
        this.page = page;

        // Locators for Log In
        this.loginButton = '#login2';
        this.logoutButton = '#logout2';
        this.usernameField = '#loginusername';
        this.passwordField = '#loginpassword';
        this.submitLoginButton = 'button[onclick="logIn()"]';
        this.navbarUsername = '#nameofuser';

        // Locators for Log Out
        this.logoutButton = '#logout2';

        // Locators for Cart
        this.cartButton = '#cartur';
        this.productSelector = '.card-title a';
        this.addToCartButton = 'a[onclick="addToCart(1)"]'; 
        this.cartItemsSelector = '.success td:nth-child(2)';
    }

    // Navigate to main page
    async navigate() {
        await this.page.goto('https://www.demoblaze.com/');
    }

    // Login
    async login(username, password) {
        await this.page.click(this.loginButton);
        await this.page.fill(this.usernameField, username);
        await this.page.fill(this.passwordField, password);
        await this.page.click(this.submitLoginButton);
        await this.page.waitForSelector(this.navbarUsername);
    }

    // Log Out
    async logout() {
        await this.page.click(this.logoutButton);
        await this.page.waitForSelector(this.loginButton);
    }

    // Add Product to Cart
    async addProductToCart(productName) {
        const productLink = this.page.locator(this.productSelector).withText(productName);
        await productLink.click();
        await this.page.click(this.addToCartButton);
        await this.page.waitForTimeout(1000);
        await this.page.evaluate(() => window.alert && window.alert.dismiss());
        await this.navigate();
    }

    // Navigate To Cart
    async navigateToCart() {
        await this.page.click(this.cartButton);
        await this.page.waitForSelector(this.cartItemsSelector);
    }

    // Check the Items in Cart
    async getCartItems() {
        const items = await this.page.$$eval(this.cartItemsSelector, elements =>
            elements.map(el => el.textContent.trim())
        );
        return items;
    }
}

class CartPage {
    constructor(page) {
        this.page = page;

        // Locators and buttons for Cart page
        this.cartNavigation = page.locator("a#cartur");
        this.cartItems = page.locator(".success");
        this.deleteButton = page.locator("a:has-text('Delete')");
        this.placeOrderButton = page.locator("button:has-text('Place Order')");
    }

    //Navigation to the Cart page
    async goToCart() { 
        await this.cartNavigation.click(); 
        await this.page.waitForLoadState('networkidle');
    }

    //Get the items that are currently in the cart
    async getCartItems() { 
        return await this.cartItems.allTextContents();
    }

    //Removes the first item that is located in the cart
    async removeFirstItem() { 
        await this.deleteButton.first().click();
        await this.page.waitForTimeout(3000);
    }

    //Places an order with the items that are currently in the cart
    async placeOrder() { 
        await this.placeOrderButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {
    HomePage,
    CartPage,
};