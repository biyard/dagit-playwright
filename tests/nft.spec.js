import { test, expect } from "@playwright/test";
import { chromium } from "playwright";
import {
  image_path,
  latency,
  agit_name,
  collection_name,
  nft_name,
} from "./constants";
import path from "path";

test.describe("NFT test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("Veiw original NFT contents", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText(nft_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByRole("button", { name: "View Original" }).click();
    await page.waitForTimeout(latency);
  });

  test("Sell NFT", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText(nft_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByRole("button", { name: "Sell Nft" }).click();
    await page.waitForTimeout(latency);
  });

  test("Buy NFT", async ({ page }) => {
    const browser = chromium.launch();
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
    page = await context.newPage();
    // TODO: TEST with another user
  });

  test("View original NFT by a new owner", async ({ page }) => {
    const browser = chromium.launch();
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
    page = await context.newPage();

    // TODO: TEST with another user
  });

  test("Failed to view original NFT by a previouse owner", async ({ page }) => {
    // TODO: TEST with original user
  });
});
