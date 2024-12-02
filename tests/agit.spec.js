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

test.describe.serial("Agit", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("[AGIT-001] Agit list view", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "go-to-agit-list", "1-go-to-search-bar"),
      fullPage: true,
    });
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "go-to-agit-list", "2-agit-list"),
      fullPage: true,
    });
  });

  test("[AGIT-002] Make a proposal", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "make-a-proposal", "1-go-to-search-bar"),
      fullPage: true,
    });
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText(agit_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "make-a-proposal", "2-select-agit"),
      fullPage: true,
    });
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "make-a-proposal", "3-go-to-DAO"),
      fullPage: true,
    });
    await page.getByText("Create Proposal", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("제목을 입력해주세요.", { exact: true })
      .fill("DAO 테스트");
    await page.waitForTimeout(latency);
    let date = new Date();
    date.setDate(date.getDate() + 7);
    let year = date.getFullYear();
    year = String(year);
    let yy = year.substring(2, 4);
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
      .getByPlaceholder("종료 일자를 입력해주세요.(YY.MM.DD)", {
        exact: true,
      })
      .fill(str);
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("내용을 입력해주세요.", { exact: true })
      .fill("테스트");
    await page.waitForTimeout(latency);
    let fileChooserPromise = page.waitForEvent("filechooser");
    let element = await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[4]/div/div[1]/div/div/div[3]/label'
      )
      .click();
    await page.waitForTimeout(latency);
    let fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(image_path, "agit_profile.png"));
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "make-a-proposal", "4-fill-proposal-form"),
      fullPage: true,
    });
    await page.getByText("등록", { exact: true }).click();
    await page.waitForLoadState();
    await page.screenshot({
      path: screenshot_path("agit", "make-a-proposal", "5-proposal-success"),
      fullPage: true,
    });
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText(agit_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "make-a-proposal", "6-proposal-created"),
      fullPage: true,
    });
  });

  test("[AGIT-003] Check a proposal list", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText(agit_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "check-a-proposal list", "1-go-to-DAO"),
      fullPage: true,
    });
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "check-a-proposal list",
        "2-go-to-proposal-list"
      ),
      fullPage: true,
    });
  });

  test("[AGIT-004] Proposal voting", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText(agit_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "proposal-voting", "1-go-to-agit"),
      fullPage: true,
    });
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "proposal-voting", "2-go-to-proposal-list"),
      fullPage: true,
    });
    await page.getByText("DAO 테스트", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "proposal-voting",
        "3-go-to-proposal-detail"
      ),
      fullPage: true,
    });
    await page.getByText("추천", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "proposal-voting", "4-click-yes-button"),
      fullPage: true,
    });
    await page.getByText("투표하기", { exact: true }).click();
    await page.waitForTimeout(3000);
    await page.screenshot({
      path: screenshot_path("agit", "proposal-voting", "5-vote-success"),
      fullPage: true,
    });
  });

  test("[AGIT-005] Make comment in proposal", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText(agit_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "make-comment-in-proposal", "1-go-to-agit"),
      fullPage: true,
    });
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "make-comment-in-proposal",
        "2-go-to-proposal-list"
      ),
      fullPage: true,
    });
    await page.getByText("DAO 테스트", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "make-comment-in-proposal",
        "3-go-to-proposal-detail"
      ),
      fullPage: true,
    });
    await page
      .locator('textarea[placeholder="댓글을 남겨주세요."]')
      .fill("test");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "make-comment-in-proposal",
        "4-write-comment"
      ),
      fullPage: true,
    });
    await page.press('textarea[placeholder="댓글을 남겨주세요."]', "Enter");
    await page.waitForTimeout(3000);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "make-comment-in-proposal",
        "5-success-comment"
      ),
      fullPage: true,
    });
  });

  test("[AGIT-006] Click a like to proposal", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByText(agit_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "click-a-like-to-proposal", "1-go-to-agit"),
      fullPage: true,
    });
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "click-a-like-to-proposal",
        "2-go-to-proposal-list"
      ),
      fullPage: true,
    });
    await page.getByText("DAO 테스트", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "click-a-like-to-proposal",
        "3-go-to-proposal-detail"
      ),
      fullPage: true,
    });
    await page.locator("svg.fill-gray-600").click();
    await page.waitForTimeout(3000);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "click-a-like-to-proposal",
        "4-success-click-like-button"
      ),
      fullPage: true,
    });
  });

  test("[AGIT-007] Follow a agit", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "follow-a-agit", "1-go-to-agit-list"),
      fullPage: true,
    });
    await page.getByText(agit_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("agit", "follow-a-agit", "2-go-to-agit"),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Follow" }).click();
    await page.waitForTimeout(3000);
    await page.screenshot({
      path: screenshot_path("agit", "follow-a-agit", "3-click-follow-button"),
      fullPage: true,
    });
  });

  test("[AGIT-008] Proposal comment time stamp check", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-comment-time-stamp-check",
        "1-go-to-agit-list"
      ),
      fullPage: true,
    });
    await page.getByText(agit_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-comment-time-stamp-check",
        "2-go-to-agit"
      ),
      fullPage: true,
    });
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-comment-time-stamp-check",
        "3-go-to-proposal-list"
      ),
      fullPage: true,
    });
    await page.getByText("DAO 테스트", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-comment-time-stamp-check",
        "4-go-to-proposal-detail-page"
      ),
      fullPage: true,
    });
    await page
      .locator('textarea[placeholder="댓글을 남겨주세요."]')
      .fill("test");
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-comment-time-stamp-check",
        "5-write-comment"
      ),
      fullPage: true,
    });
    await page.press('textarea[placeholder="댓글을 남겨주세요."]', "Enter");
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-comment-time-stamp-check",
        "6-check-time-stamp"
      ),
      fullPage: true,
    });
  });

  test("[AGIT-009] Proposal voting result check", async ({ page }) => {
    await page
      .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
      .click();
    await page.waitForTimeout(latency);
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-voting-result-check",
        "1-go-to-agit-list"
      ),
      fullPage: true,
    });
    await page.getByText("Test Agit - 1730880533", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-voting-result-check",
        "2-go-to-agit"
      ),
      fullPage: true,
    });
    await page.getByText("DAO", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-voting-result-check",
        "3-go-to-proposal-list"
      ),
      fullPage: true,
    });
    await page.getByText("DAO 테스트", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-voting-result-check",
        "4-go-to-proposal-detail-page"
      ),
      fullPage: true,
    });
    const percentageLocator = page.locator("span.z-[1].text-right", {
      hasText: /([1-9]?[0-9]|100)%/,
    });
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "agit",
        "Proposal-voting-result-check",
        "5-proposal-voting-check"
      ),
      fullPage: true,
    });
  });
});
