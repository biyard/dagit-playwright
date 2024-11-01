// @ts-check
import { test, expect } from '@playwright/test';

      test('main navigation', async ({ page }) => {
        // Assertions use the expect API.
        await expect(page).toHaveURL('https://dagit.club/ko/');
      });
      test('get started link', async ({ page }) => {
        // Assertions use the expect API.
        await page.getByRole('link', { name: 'Collection' }).click();
      });
      test('go to page', async ({ page }) => {
        // Assertions use the expect API.
        await page.goto('https://dagit.club/ko/collection/list/');
        await page.getByText('UNSEEN LAYERS').click();
      // Expects page to have a heading with the name of Installation.
      });