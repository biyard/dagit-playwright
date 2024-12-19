import { test, expect } from "@playwright/test";
import {
  image_path,
  latency,
  agit_name,
  collection_name,
  nft_name,
  screenshot_path,
} from "./constants";
import path from "path";
import { text } from "stream/consumers";

test.describe("Main", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("[Main-page-001] Main banner scroll ckeck", async ({ page }) => {
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Main",
        "Main-banner-scroll-ckeck",
        "1-go-to-main-page"
      ),
      fullPage: true,
    });
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div/div[1]/div[3]')

      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Main",
        "Main-banner-scroll-ckeck",
        "2-move-to-forward-banner"
      ),
    });
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div/div[1]/div[1]')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Main",
        "Main-banner-scroll-ckeck",
        "2-move-to-back-banner"
      ),
    });
  });

  //In to the create page, background is should be blurred
  test("[Main-page-002] Screen blur check", async ({ page }) => {
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("Main", "Screen-blur-check", "1-go-to-main-page"),
      fullPage: true,
    });
    await page.getByText("Create").click();
    await page.screenshot({
      path: screenshot_path("Main", "Screen-blur-check", "2-go-to-create-page"),
      fullPage: true,
    });
  });

  //The outside of popup section click, popup have to still visible
  test("[Main-page-003] Out of popup section click test", async ({ page }) => {
    const popup = page.locator('xpath=//*[@id="main"]/div[1]/div[1]');
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Main",
        "Out-of-popup-section-click-test",
        "1-go-to-main-page"
      ),
      fullPage: true,
    });
    await page.getByText("Create", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Main",
        "Out-of-popup-section-click-test",
        "2-go-to-create-page"
      ),
      fullPage: true,
    });
    await page.locator("body").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Main",
        "Out-of-popup-section-click-test",
        "3-click-to-out-of-popup-section"
      ),
      fullPage: true,
    });
    await expect(popup).toBeVisible();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "Main",
        "Out-of-popup-section-click-test",
        "4-still-visible-popup-section"
      ),
      fullPage: true,
    });
  });
});
