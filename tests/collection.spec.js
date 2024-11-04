import { test, expect } from "@playwright/test";
import { latency, agit_name, collection_name, nft_name } from "./constants";

test.describe("testing collection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("default url to /ko", async ({ page }) => {
    await expect(page).toHaveURL("/ko/");
    await page.waitForTimeout(latency);
  });
  test("have link to collection list", async ({ page }) => {
    await page.getByRole("link", { name: "Collection" }).click();
    await page.waitForTimeout(latency);
  });

  test("shows a created collection in collection list", async ({ page }) => {
    await page.getByRole("link", { name: "Collection" }).click();
    await page.waitForTimeout(latency);
    await page.getByText(collection_name, { exact: true }).click();
    await page.waitForTimeout(latency);
  });
});
