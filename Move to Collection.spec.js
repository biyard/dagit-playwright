// @ts-check
import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
    test.beforeEach(async ({ page }) => {
      // Go to the starting url before each test.
    await page.goto('https://dagit.club/ko/');
    await page.waitForTimeout(3000);  
    });
    test('main navigation', async ({ page }) => {
      // Assertions use the expect API.
    await expect(page).toHaveURL('https://dagit.club/ko/');
    await page.waitForTimeout(3000);
  });
    test('get started link', async ({ page }) => {
      // Assertions use the expect API.
    await page.getByRole('link', { name: 'Collection' }).click();
    await page.waitForTimeout(3000);
  });
    test('go to page', async ({ page }) => {
      // Assertions use the expect API.
    await page.goto('https://dagit.club/ko/collection/list/');
    await page.getByText('UNSEEN LAYERS').click();
    await page.waitForTimeout(3000);
    // Expects page to have a heading with the name of Installation.
    });
});
//test