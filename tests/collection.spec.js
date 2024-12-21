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

test.describe("Collection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("[Collection-001] Collection list view", async ({ page }) => {
    await page.getByRole("link", { name: "Collection" }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "go-to-collection-list",
        "1-go-to-collection-list"
      ),
      fullPage: true,
    });
  });

  test("[Collection-002] Collection offline shooting request", async ({
    page,
  }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText(agit_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Collection-offline-shooting-request",
        "1-go-to-agit"
      ),
      fullPage: true,
    });
    await page.getByText(collection_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Collection-offline-shooting-request",
        "2-go-to-collection"
      ),
      fullPage: true,
    });
    await page.getByText("콜렉션 오프라인 촬영 요청", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Collection-offline-shooting-request",
        "3-go-to-Collection offline shooting request"
      ),
      fullPage: true,
    });
    await page.getByPlaceholder("작품 이름을 입력해 주세요.").fill(nft_name);
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("작품에 대한 상세한 설명을 입력해 주세요.")
      .fill("test");
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder(
        "작품 촬영 시 최종 형상의 분위기 등 촬영에서 지향하고자 하는 방향을 입력해 주세요."
      )
      .fill("test");
    await page.waitForTimeout(latency);
    await page.getByPlaceholder("작품 호수를 입력해 주세요.").fill("test");
    await page.waitForTimeout(latency);
    let date = new Date();
    date.setDate(date.getDate() + 7);
    let year = date.getFullYear();
    year = String(year);
    let yy = year.substring();
    let month = new String(date.getMonth() + 1);
    let day = new String(date.getDate());
    if (month.length == 1) {
      month = "0" + month;
    }
    if (day.length == 1) {
      day = "0" + day;
    }
    let str = yy + "." + month + "." + day;
    await page
      .getByPlaceholder("2024.01.01", {
        exact: true,
      })
      .fill(str);
    await page
      .getByPlaceholder("담당자 전화번호를 입력해 주세요.")
      .fill("000-0000-0000");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Collection-offline-shooting-request",
        "4-fill-form"
      ),
      fullPage: true,
    });
    await page.getByText("촬영 요청하기").click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Collection-offline-shooting-request",
        "5-request-sent"
      ),
      fullPage: true,
    });
  });

  test("[Collection-003] Follow a collection", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText(agit_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "follow-a-collection",
        "1-go-to-agit"
      ),
      fullPage: true,
    });
    await page.getByText(collection_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "follow-a-collection",
        "2-go-to-collection"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Follow" }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "follow-a-collection",
        "3-click-follow"
      ),
      fullPage: true,
    });
  });

  test("[Collection-004] Check-item-quantity-matches-the-displayed-text", async ({
    page,
  }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[5]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Check-item-quantity-matches-the-displayed-text",
        "1-go-to-my-profile-page"
      ),
      fullPage: true,
    });
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText("Test Agit - 1730878927").click();
    await page.waitForTimeout(latency);
    await page.getByText("Test Collection - 1730878927").first().click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Check-item-quantity-matches-the-displayed-text",
        "2-view-a-collection-page"
      ),
      fullPage: true,
    });

    const childDivs = await page.locator(
      'xpath=//*[@id="main"]/div[1]/div[4]/div/div[3]/div[3]/*'
    );
    const count = await childDivs.count();
    const displayedText = await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[4]/div/div[3]/div[1]/div[1]/div[2]/div[1]/p[2]'
      )
      .innerText();
    const displayedNumber = parseInt(displayedText.replace(/\D/g, ""), 10);

    if (count === displayedNumber) {
      console.log(
        `Test passed: Item count (${count}) matches displayed number (${displayedNumber})`
      );
    } else {
      throw new Error(
        `Test failed: Item count (${count}) does not match displayed number (${displayedNumber})`
      );
    }

    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Check-item-quantity-matches-the-displayed-text",
        "3-check-item-quantity"
      ),
      fullPage: true,
    });
  });

  test("[Collection-005] Mint-NFT-function-in-collection", async ({ page }) => {
    await page.goto("https://dev.dagit.club/ko/collection/151/131");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Mint-NFT-function-in-collection",
        "1-go-to-collection"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Mint NFT" }).click();
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("Name yout NFT", { exact: true })
      .fill(nft_name);
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("Enter a description", { exact: true })
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
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Mint-NFT-function-in-collection",
        "3-fill-the-descriptions"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Create" }).click();
    await page.waitForTimeout(latency);
    const result = page.getByText(nft_name);
    await expect(result).toBeVisible();
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Mint-NFT-function-in-collection",
        "4-NFT-created-success"
      ),
      fullPage: true,
    });
  });

  test("[Collection-006] Check-item-quantity-matches-in-collection-items", async ({
    page,
  }) => {
    await page.goto("https://dev.dagit.club/ko/collection/list");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Check-item-quantity-matches-in-collection-items",
        "1-go-to-collection-list-page"
      ),
      fullPage: true,
    });
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto("https://dev.dagit.club/ko/collection/list");
    await page1
      .locator('xpath =//*[@id="main"]/div[1]/div[5]/div[1]/div/div[1]/div/img')
      .click();
    const childDivs = await page1.locator(
      'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div[2]/div[3]/*'
    );
    await page1.waitForTimeout(latency);
    const count = await childDivs.count();
    const displayedText = await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[5]/div[1]/div/div[1]/p[2]/span'
      )
      .innerText();
    const displayedNumber = parseInt(displayedText.replace(/\D/g, ""), 10);

    if (count === displayedNumber) {
      console.log(
        `Test passed: Item count (${count}) matches displayed number (${displayedNumber})`
      );
    } else {
      throw new Error(
        `Test failed: Item count (${count}) does not match displayed number (${displayedNumber})`
      );
    }
    await page.screenshot({
      path: screenshot_path(
        "collection",
        "Check-item-quantity-matches-the-displayed-text",
        "3-check-item-quantity"
      ),
      fullPage: true,
    });
  });
});
