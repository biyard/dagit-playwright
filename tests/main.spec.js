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

test.describe("Main", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("[Main-001] Main banner scroll ckeck", async ({ page }) => {
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
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/div/div/div[1]/div[3]')

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
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/div/div/div[1]/div[1]')
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
});
