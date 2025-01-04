const { test, expect } = require('@playwright/test');
const DemoBlazePage = require('../pageObjectModels/ammPOM');

test('Navigate to ASUS Full HD product page', async ({ page }) => {
    const demoBlaze = new DemoBlazePage(page);

    
    await demoBlaze.navigateToHome(); // Navigate to the homepage   
    await demoBlaze.selectMonitorsCategory(); // Click on the Monitors category 
    await demoBlaze.selectAsusFullHD(); // Click on ASUS Full HD
    // Verify is the product-page that is being shown displays ASUS Full HD
    const productTitle = await demoBlaze.getProductTitle();
    expect(productTitle).toBe('ASUS Full HD');
});
