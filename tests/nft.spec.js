import { test, expect } from "@playwright/test";
import { chromium } from "playwright";
import {
  image_path,
  latency,
  agit_name,
  collection_name,
  nft_name,
  screenshot_path,
} from "./constants";
import path from "path";

test.describe.serial("NFT", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("[NFT-001] View original NFT contents", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "veiw original NFT contents",
        "1-my-profile"
      ),
      fullPage: true,
    });
    await page.getByText("Test NFT - 1732186193").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "veiw original NFT contents",
        "2-nft-detail"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "View Original" }).click();
    await page.waitForTimeout(5000);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "veiw original NFT contents",
        "3-after-view-original-nft"
      ),
      fullPage: true,
    });
  });

  test("[NFT-002] Sell NFT", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "sell-nft", "1-my-profile"),
      fullPage: true,
    });
    await page.getByText("Test NFT - 1730878927").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "sell-nft", "2-nft-detail"),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Sell Nft" }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "sell-nft", "3-after-sell-nft"),
      fullPage: true,
    });
  });

  test("[NFT-003] Buy NFT", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      storageState: {
        origins: [
          {
            origin: process.env.BASE_URL || "",
            localStorage: [
              {
                name: "identity",
                value: `"${process.env.IDENTITY2}"` || "",
              },
            ],
          },
        ],
      },
    });

    const page = await context.newPage();
    await page.goto("/");
    await page.getByPlaceholder("Search").click();
    await page.fill('[placeholder="Search"]', "Test NFT - 1730878927");
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "1-search-results"),
      fullPage: true,
    });
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[2]/div/div/div[1]/div[3]')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "2-go-to-nft"),
      fullPage: true,
    });
    await page.getByText("Test NFT - 1730878927").first().click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "3-go-to-nft-detail"),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Buy now" }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "4-buy-nft"),
      fullPage: true,
    });
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "5-go-to-my-profile"),
      fullPage: true,
    });
    await page.reload();
    await page.getByText("Test NFT - 1730878927").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "6-go-to-nft-detail"),
      fullPage: true,
    });
  });

  test("[NFT-004] View original NFT by a new owner", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      storageState: {
        origins: [
          {
            origin: process.env.BASE_URL || "",
            localStorage: [
              {
                name: "identity",
                value: `"${process.env.IDENTITY2}"` || "",
              },
            ],
          },
        ],
      },
    });

    const page = await context.newPage();
    await page.goto("/");
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "View-original-NFT-by-a-new-owner",
        "1-go-to-my-profile"
      ),
      fullPage: true,
    });
    await page.getByText("Test NFT - 1730878927").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "View-original-NFT-by-a-new-owner",
        "2-go-to-nft-detail"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "View Original" }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "View-original-NFT-by-a-new-owner",
        "3-click-view-original"
      ),
      fullPage: true,
    });
  });

  test("[NFT-005] Failed to view original NFT by a previous owner", async ({
    page,
  }) => {
    await page.getByPlaceholder("Search").click();
    await page.fill('[placeholder="Search"]', "Test NFT - 1730878927");
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Failed-to-view-original-NFT-by-a-previous-owner",
        "1-search-nft"
      ),
      fullPage: true,
    });
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[2]/div/div/div[1]/div[3]')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("Test NFT - 1730878927").first().click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Failed-to-view-original-NFT-by-a-previous-owner",
        "2-go-to-nft-detail"
      ),
      fullPage: true,
    });
    const locator = page.locator(
      'xpath=//*[@id="main"]/div[1]/div[4]/div/div[2]/button'
    );
    await expect(locator).toBeDisabled();
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Failed-to-view-original-NFT-by-a-previous-owner",
        "3-check-view-original-button"
      ),
      fullPage: true,
    });
  });

  test("[NFT replace] Sell NFT", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      storageState: {
        origins: [
          {
            origin: process.env.BASE_URL || "",
            localStorage: [
              {
                name: "identity",
                value: `"${process.env.IDENTITY2}"` || "",
              },
            ],
          },
        ],
      },
    });

    const page = await context.newPage();
    await page.goto("/");
    await page.getByPlaceholder("Search").click();
    await page.fill('[placeholder="Search"]', "Test NFT - 1730878927");
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[2]/div/div/div[1]/div[3]')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("Test NFT - 1730878927").first().click();
    await page.waitForTimeout(latency);
    await page.getByRole("button", { name: "Sell Nft" }).click();
    await page.waitForTimeout(latency);
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.reload();
    await page.getByText("Test NFT - 1730878927").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "6-go-to-nft-detail"),
      fullPage: true,
    });
  });
  test("[NFT replace] Buy NFT", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("Search").click();
    await page.fill('[placeholder="Search"]', "Test NFT - 1730878927");
    await page.waitForTimeout(latency);
    await page.press('[placeholder="Search"]', "Enter");
    await page.waitForTimeout(latency);
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[2]/div/div/div[1]/div[3]')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("Test NFT - 1730878927").first().click();
    await page.waitForTimeout(latency);
    await page.getByRole("button", { name: "Buy now" }).click();
    await page.waitForTimeout(latency);
  });
});
