import { test, expect } from "@playwright/test";
import { chromium } from "playwright";
import {
  image_path,
  latency,
  longlatency,
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
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
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
    await page.waitForTimeout(longlatency);
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
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
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
    await page.getByRole("button", { name: "Sell artwork" }).click();
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
    await page.goto("https://dev.dagit.club/ko/nft/69/0");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "1-go-to-NFT-page"),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Buy now" }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "2-buy-nft"),
      fullPage: true,
    });
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "3-go-to-my-profile"),
      fullPage: true,
    });
    await page.reload();
    await page.getByText("Test NFT - 1730878927").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("nft", "Buy-NFT", "4-go-to-nft-detail"),
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
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
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
    await page.goto("https://dev.dagit.club/ko/nft/69/0");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Failed-to-view-original-NFT-by-a-previous-owner",
        "1-go-to-nft-detail"
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
        "2-check-view-original-button"
      ),
      fullPage: true,
    });
  });

  // When search function is working rightly, adjust "[NFT replace] tests"
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
    await page.getByRole("button", { name: "Sell artwork" }).click();
    await page.waitForTimeout(latency);
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
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

  test("[NFT-006] Check the NFT image section size", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Check-the-NFT-image-section-size",
        "1-my-profile"
      ),
      fullPage: true,
    });
    await page.getByText("Test NFT - 1732186193").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Check-the-NFT-image-section-size",
        "2-nft-detail"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Details" }).click();
    await page.waitForTimeout(longlatency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Check-the-NFT-image-section-size",
        "3-view-Detail-button-page"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Activity" }).click();
    await page.waitForTimeout(longlatency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Check-the-NFT-image-section-size",
        "3-view-Activity-button-page"
      ),
      fullPage: true,
    });
  });

  //'NFT-007' test codes will be adjust, when search function is fixed

  test("[NFT-007] Check NFT status after trades", async ({ page }) => {
    const buttonLocator1 = page.getByRole("button", { name: "Buy now" });
    await page.goto("https://dev.dagit.club/ko/nft/69/0");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Check-NFT-status-after-trades",
        "1-NFT-detail-page(Sell)"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Sell artwork" }).click();
    await page.waitForTimeout(latency);
    await expect(buttonLocator1).toBeVisible();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Check-NFT-status-after-trades",
        "2-chcek-the-NFT-status(visible-Buy-now-button)"
      ),
      fullPage: true,
    });
    const browser = await chromium.launch();
    const context2 = await browser.newContext({
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
    const buttonLocator2 = page.getByRole("button", { name: "Sell artwork" });
    const page1 = await context2.newPage();
    await page1.goto("https://dev.dagit.club/ko/nft/69/0");
    await page1.waitForTimeout(latency);
    await page1.screenshot({
      path: screenshot_path(
        "nft",
        "Check-NFT-status-after-trades",
        "3-NFT-detail-page(Buy)"
      ),
      fullPage: true,
    });
    await page1.getByRole("button", { name: "Buy now" }).click();
    await page1.waitForTimeout(latency);
    await expect(buttonLocator2).toBeVisible();
    await page1.waitForTimeout(latency);
    await page1.screenshot({
      path: screenshot_path(
        "nft",
        "Check-NFT-status-after-trades",
        "4-chcek-the-NFT-status(visible-Sell-NFT-button)"
      ),
      fullPage: true,
    });
  });

  test("[NFT-008] Image-section-size-check-between-Detail&Activity-menu ", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page1.screenshot({
      path: screenshot_path(
        "nft",
        "Image-section-size-check-between-Detail&Activity-menu",
        "1-go-to-my-profile)"
      ),
      fullPage: true,
    });
    await page.getByText("Test NFT - 1730878927").first().click();
    await page.waitForTimeout(latency);
    await page1.screenshot({
      path: screenshot_path(
        "nft",
        "Image-section-size-check-between-Detail&Activity-menu",
        "2-go-to-nft-detail-page)"
      ),
      fullPage: true,
    });
    const style = page.locator('[style="height: 700px"]');
    const originalStyle = await style.evaluate((element) => {
      return element.style.height;
    });
    await page1.screenshot({
      path: screenshot_path(
        "nft",
        "Image-section-size-check-between-Detail&Activity-menu",
        "3-image-section-size-check)"
      ),
      fullPage: true,
    });
    console.log(`Original style: ${originalStyle}`);
    await page.getByRole("button", { name: "Activity" }).click();
    const updatedStyle = await style.evaluate((element) => {
      return element.style.height;
    });
    await page1.screenshot({
      path: screenshot_path(
        "nft",
        "Image-section-size-check-between-Detail&Activity-menu",
        "4-image-section-size-check-between-Detail)"
      ),
      fullPage: true,
    });
    console.log(`Updated style: ${updatedStyle}`);
    expect(updatedStyle).toBe(originalStyle);
  });

  test("[NFT-009] Image-visible-check-when-public-nft-minting", async ({
    page,
  }) => {
    await page.goto("https://dev.dagit.club/ko/collection/58/57");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Image-section-size-check-between-Detail&Activity-menu",
        "1-go-to-my-collection-page"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Mint NFT" }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Image-section-size-check-between-Detail&Activity-menu",
        "2-click-mint-nft-button"
      ),
      fullPage: true,
    });
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div[1]/div/div[2]/div[2]/form/div[2]/input'
      )
      .fill("Test");
    await page.waitForTimeout(latency);
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div[1]/div/div[2]/div[2]/form/div[3]/textarea'
      )
      .fill("Test");
    await page.waitForTimeout(latency);
    let fileChooserPromise = page.waitForEvent("filechooser");
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div[1]/div/div[2]/div[1]/div/div/div/label'
      )
      .click();
    await page.waitForTimeout(latency);
    let fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(image_path, "nft.png"));
    await page.waitForTimeout(latency);
    const imageSelector =
      'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div[1]/div/div[2]/div[1]/div/div/div/label/img';
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Image-section-size-check-between-Detail&Activity-menu",
        "3-fill-information"
      ),
      fullPage: true,
    });
    await expect(page.locator(imageSelector)).toBeVisible();
    await page.getByRole("button", { name: "Create" }).click();
    let isImageDisappeared = false;
    for (let i = 0; i < 10; i++) {
      try {
        await page.waitForTimeout(300);
        await expect(page.locator(imageSelector)).toBeVisible({ timeout: 300 });
      } catch (e) {
        isImageDisappeared = true;
        break;
      }
    }
    await page.screenshot({
      path: screenshot_path(
        "nft",
        "Image-section-size-check-between-Detail&Activity-menu",
        "4-check-minting-screen"
      ),
      fullPage: true,
    });
    if (isImageDisappeared) {
      console.log("Image disappeared during the process!");
    } else {
      console.log("Image remained visible throughout the process.");
    }
    expect(isImageDisappeared).toBe(false);
  });
});
