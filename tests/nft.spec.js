import { test, expect } from "@playwright/test";
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

test("veiw original NFT contents", async ({ page }) => {
    await page
    .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
    .click();
    await page.waitForTimeout(latency);
    await page.getByText(nft_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByRole("button", { name: "View Original" }).click();
    await page.waitForTimeout(latency);
});

test("sell NFT", async ({ page }) => {
    await page
    .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
    .click();
    await page.waitForTimeout(latency);
    await page.getByText(nft_name, { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.getByRole("button", { name: "Sell Nft" }).click();
    await page.waitForTimeout(latency);
});
});