import { test, expect } from "@playwright/test";
import {
    image_path,
    latency,
    agit_name,
    collection_name,
    nft_name,
} from "./constants";
import path from "path";


test.describe("My profile test", () => {
    test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
    });
    
test("edit a profile", async ({ page }) => {
    await page
    .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
    .click();
    await page.waitForTimeout(latency);
    await page.getByText("Edit Profile", { exact: true }).click();
    await page.waitForTimeout(latency);
    let fileChooserPromise = page.waitForEvent("filechooser");
    let element = await page
    .locator(
        'xpath=//*[@id="main"]/div[1]/div[4]/div[2]/div/div[2]/label'
    )
    .click();
    await page.waitForTimeout(latency);
    let fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(image_path, "agit_profile.png"));
    await page.waitForTimeout(latency);
    await page
    .getByPlaceholder("Enter a name", {
    exact: true,})
    .fill("Test name");
await page.waitForTimeout(latency);
await page
.getByPlaceholder("Enter a description", {
    exact: true,
})
.fill("d.AGIT Test");
await page.waitForTimeout(latency);
await page.getByText("완료", { exact: true }).click();
await page.waitForTimeout(latency);
});

test("check a creative credit", async ({ page }) => {
    await page
    .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
    .click();
    await page.waitForTimeout(latency);
});

test("check a creative credit earnings", async ({ page }) => {
    await page
    .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
    .click();
    await page.waitForTimeout(latency);
    await page
    .locator('xpath=//*[@id="main"]/div[1]/div[4]/div[3]/div[1]/div/div[2]/button[2]/div')
    .click();
    await page.waitForTimeout(latency);
    await page.getByText("Earnings", { exact: true }).click();
    await page.waitForTimeout(latency);
});

test("check a creative credit activity", async ({ page }) => {
    await page
    .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
    .click();
    await page.waitForTimeout(latency);
    await page
    .locator('xpath=//*[@id="main"]/div[1]/div[4]/div[3]/div[1]/div/div[2]/button[2]/div')
    .click();
    await page.waitForTimeout(latency);
    await page.getByText("Activity", { exact: true }).click();
    await page.waitForTimeout(latency);
});

test("shows a created nft list", async ({ page }) => {
    await page
    .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
    .click();
    await page.waitForTimeout(latency);
  // await page.getByText("Item", { exact: true }).click();
  // await page.waitForTimeout(latency);
});

test("go to created agit list", async ({ page }) => {
    await page
    .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
    .click();
    await page.waitForTimeout(latency);
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
});
});
