class HomePage {
    constructor(page) {
        this.page = page;

        // Constants for reuse
        this.USERNAME_DELAY = 90;
        this.PASSWORD_DELAY = 50;
        this.SIGN_UP_BUTTON_TEXT = 'Sign Up';
        this.LOG_IN_BUTTON_TEXT = 'Log in';

        // Locators for Sign Up
        this.signUpNav = page.locator("#signin2");
        this.userName = page.locator("#sign-username");
        this.passWord = page.locator("#sign-password");
        this.signUpButton = page.locator("button").filter({ hasText: this.SIGN_UP_BUTTON_TEXT });

        // Locators for Log In
        this.loginNav = page.locator("#login2");
        this.loginUserName = page.locator("#loginusername");
        this.loginPassword = page.locator("#loginpassword");
        this.loginButton = page.locator("button").filter({ hasText: this.LOG_IN_BUTTON_TEXT });

        // Shared Locators
        this.aboutUs = page.locator("a:has-text('About us')");
    }

    // Navigate to the homepage
    async goTo() {
        await this.page.goto("https://www.demoblaze.com");
        await this.page.waitForTimeout(5000); 
    }

    // Sign Up Action
    async validSignUp(username, password) {
        // Open sign-up modal
        await this.signUpNav.click();

        // Fill in username and password fields with delay
        await this.userName.type(username, { delay: this.USERNAME_DELAY });
        await this.passWord.type(password, { delay: this.PASSWORD_DELAY });

        // Click the sign-up button
        await this.signUpButton.click();
    }

    // Log In Action
    async validLogIn(username, password) {
        // Open log-in modal
        await this.loginNav.click();

        // Fill in username and password fields with delay
        await this.loginUserName.type(username, { delay: this.USERNAME_DELAY });
        await this.loginPassword.type(password, { delay: this.PASSWORD_DELAY });

        // Click the log-in button
        await this.loginButton.click();
    }
}

//Model of Cart Page
class CartPage {
    constructor(page) {
        this.page = page;

        // Locators and buttons for Cart page
        this.cartNavigation = page.locator("a#cartur");
        this.cartItems = page.locator(".success");
        this.deleteButton = page.locator("a:has-text('Delete')");
        this.placeOrderButton = page.locator("button:has-text('Place Order')");
    }

    async goToCart() { //Navigation to the Cart page
        await this.cartNavigation.click(); 
        await this.page.waitForLoadState('networkidle');
    }

    async getCartItems() { //Get the items that are currently in the cart
        return await this.cartItems.allTextContents();
    }

    async removeFirstItem() { //Removes the first item that is located in the cart
        await this.deleteButton.first().click();
        await this.page.waitForTimeout(3000);
    }

    async placeOrder() { //Places an order with the items that are currently in the cart
        await this.placeOrderButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {
    HomePage,
    CartPage,
};