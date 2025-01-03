const {test, expect} = require('@playwright/test');
const {HomePage} = require('../pageObjectModels/indexPOM');

test('User Sign Up', async ({page})=>
  {
    const username = "testgroup647@gmail.com";
    const password = "RedzoBlaze12"; 
    const homePage =  new HomePage(page);
    await homePage.goTo();
    await homePage.validSignUp(username, password);
    await page.waitForLoadState('networkidle');
  }
);