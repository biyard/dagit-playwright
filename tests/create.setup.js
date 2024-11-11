import { test } from "@playwright/test";
import {
  image_path,
  latency,
  agit_name,
  collection_name,
  nft_name,
  screenshot_path,
} from "./constants";
import path from "path";

test.describe("setup data", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
  });

  test("creating Agit", async ({ page }) => {
    await page.getByText("Create", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("create", "creating-Agit", "1-go-to-create"),
      fullPage: true,
    });
    await page.getByText("Build an agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("create", "creating-Agit", "2-go-to-build-an-agit"),
      fullPage: true,
    });
    await page.getByPlaceholder("아지트 입력", { exact: true }).fill(agit_name);
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("아지트 설명 입력", { exact: true })
      .fill("Test");
    await page.waitForTimeout(latency);
    let fileChooserPromise = page.waitForEvent("filechooser");
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div[1]/div/label/div/div'
      )
      .click();
    await page.waitForTimeout(latency);
    let fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(image_path, "agit_profile.png"));
    await page.waitForTimeout(latency);
    fileChooserPromise = page.waitForEvent("filechooser");
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div[2]/div/label/div/div/div/label/div'
      )
      .click();
    await page.waitForTimeout(latency);
    fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(image_path, "agit_banner.png"));
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("create", "creating-Agit", "3-fill-agit-details"),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Create" }).click();

    // NOTE: wait for transaction and fetcher.
    await page.waitForTimeout(5000);
    await page.screenshot({
      path: screenshot_path("create", "creating-Agit", "4-check-agit-creation"),
      fullPage: true,
    });
  });

  test("creating a new collection", async ({ page }) => {
    await page.getByText("Create", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "create",
        "creating-a-new-collection",
        "1-go-to-create"
      ),
      fullPage: true,
    });
    await page.getByText("Drop a collection", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "create",
        "creating-a-new-collection",
        "2-go-to-drop-a-collection"
      ),
      fullPage: true,
    });
    await page.selectOption("select", agit_name);
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("콜렉션 이름 입력", { exact: true })
      .fill(collection_name);
    await page.waitForTimeout(latency);
    await page
      .getByPlaceholder("콜렉션 설명 입력", { exact: true })
      .fill("Test");
    await page.waitForTimeout(latency);
    let fileChooserPromise = page.waitForEvent("filechooser");
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div[1]/div/label/div/div/div/label/div'
      )
      .click();
    await page.waitForTimeout(latency);
    let fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(image_path, "collection_profile.png"));
    fileChooserPromise = page.waitForEvent("filechooser");
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div[2]/div/label/div/div/div/label/div'
      )
      .click();
    await page.waitForTimeout(latency);
    fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(image_path, "collection_banner.png"));
    await page.screenshot({
      path: screenshot_path(
        "create",
        "creating-a-new-collection",
        "3-fill-collection-details"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Create" }).click();

    // NOTE: wait for transaction and fetcher.
    await page.waitForTimeout(5000);
    await page.screenshot({
      path: screenshot_path(
        "create",
        "creating-a-new-collection",
        "4-check-collection-creation"
      ),
      fullPage: true,
    });
  });

  test("creating a new NFT", async ({ page }) => {
    await page.getByText("Create", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path("create", "creating-a-new-NFT", "1-go-to-create"),
      fullPage: true,
    });
    await page.getByText("Mint a NFT", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.selectOption("select", collection_name);
    await page.waitForTimeout(latency);
    await page.screenshot({
      path: screenshot_path(
        "create",
        "creating-a-new-NFT",
        "2-go-to-mint-a-NFT"
      ),
      fullPage: true,
    });
    await page
      .getByPlaceholder("NFT 이름 입력", { exact: true })
      .fill(nft_name);
    await page.waitForTimeout(latency);
    await page.getByPlaceholder("NFT 설명 입력", { exact: true }).fill("Test");
    await page.waitForTimeout(latency);
    let fileChooserPromise = page.waitForEvent("filechooser");
    await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div/div/label/div/div/div'
      )
      .click();
    await page.waitForTimeout(latency);
    let fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(image_path, "nft.png"));
    await page.screenshot({
      path: screenshot_path(
        "create",
        "creating-a-new-NFT",
        "3-fill-NFT-details"
      ),
      fullPage: true,
    });
    await page.getByRole("button", { name: "Create" }).click();

    // NOTE: wait for transaction and fetcher.
    await page.waitForTimeout(5000);
    await page.screenshot({
      path: screenshot_path(
        "create",
        "creating-a-new-NFT",
        "4-check-NFT-creation"
      ),
      fullPage: true,
    });
  });
});
