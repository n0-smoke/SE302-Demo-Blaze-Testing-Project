const { test, expect } = require('@playwright/test');

test('Page Load Test', async ({ page }) => {
  const url = "https://www.demoblaze.com/";
  
  // Navigate to the page
  await page.goto(url);

  // Verify the page has loaded
  await expect(page).toHaveURL(url);

  // Ensure the title of the page is correct
  const title = await page.title();
  expect(title).toBe('STORE');
  
  // Optionally check for a specific element to ensure full page load
  const homeNav = page.locator('a.nav-link:has-text("Home")');
  await expect(homeNav).toBeVisible();
});
