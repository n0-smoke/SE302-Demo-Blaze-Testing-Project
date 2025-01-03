class HomePage {
    constructor(page) {
        this.page = page;
        
        // Constants for reuse
        this.USERNAME_DELAY = 90;
        this.PASSWORD_DELAY = 50;
        this.SIGN_UP_BUTTON_TEXT = 'Sign Up';

        // Locators
        this.aboutUs = page.locator("a:has-text('About us')");
        this.signUpNav = page.locator("#signin2");
        this.userName = page.locator("#sign-username");
        this.passWord = page.locator("#sign-password");
        this.signUpButton = page.locator("button").filter({ hasText: this.SIGN_UP_BUTTON_TEXT }).getByRole("button");
        this.signUpModal = page.locator("#signInModal");
    }

    // ACTIONS
    async goTo() {
        await this.page.goto("https://www.demoblaze.com");
    }

    async validSignUp(username, password) {
        // Open sign-up modal
        await this.signUpNav.click();
        
        // Fill in username and password fields with delay
        await this.userName.type(username, { delay: this.USERNAME_DELAY });
        await this.passWord.type(password, { delay: this.PASSWORD_DELAY });

        // Optional: Uncomment for debugging purposes
        // await this.page.pause();
    }
}

module.exports = { HomePage };
