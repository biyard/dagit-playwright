import { test, expect } from "@playwright/test";
import {
  image_path,
  latency,
  agit_name,
  collection_name,
  nft_name,
} from "./constants";
import path from "path";


test.describe("testing", () => {
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
    exact: true,
  })
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
});
//check a creative credit
//check a detail of creative credit
//shows a created agit list
//shows a created nft list
