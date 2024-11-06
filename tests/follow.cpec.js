import { test, expect } from "@playwright/test";
import { latency, agit_name, collection_name, nft_name } from "./constants";

test.describe("testing collection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("follow a agit", async ({ page }) => {
    await page
        .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
        .click();
        await page.waitForTimeout(latency);
        await page.getByText(agit_name, { exact: true }).click();
        await page.waitForTimeout(latency);
        await page.getByRole("button", { name: "Follow" }).click();
        await page.waitForTimeout(latency);
    });
});
