const { test, expect } = require('@playwright/test');
const { HomePage, CartPage } = require('../pageObjectModels/adnaPOM');

test('Item can be clicked and information is properly displayed', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goTo(); // Navigates to the Home page

    const item = page.locator('.card-title').first(); // Finds the first item on the Home page and clicks on it
    await item.click();
    await page.waitForLoadState('networkidle'); // Waits for the page to fully load
    await page.waitForTimeout(1000);

    // Locators for item information
    const nameLocator = page.locator('.name');
    const descriptionLocator = page.locator('.description');
    const priceLocator = page.locator('h3.price-container');

    // Save item information into variables (name, description and price)
    const name = await nameLocator.innerText();
    const description = await descriptionLocator.innerText();
    
    // From price container, extract only the price (without 'including tax')
    const fullPriceText = await priceLocator.innerText();
    const price = fullPriceText.split(' ')[0];

    // Ensure product information is not empty and is displayed
    expect(name).not.toBeNull();
    expect(description).not.toBeNull();
    expect(price).not.toBeNull();
});
