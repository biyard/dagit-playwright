import { test, expect } from "@playwright/test";
import {
    image_path,
    latency,
    agit_name,
    collection_name,
    nft_name,
} from "./constants";
import path from "path";

test.describe.serial("Without login", () => {
    test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
    });

    test("go to collection list", async ({ page }) => {
        await page.getByRole("button", { name: "Logout" }).click();
        await page.waitForTimeout(latency);
        await page.getByRole("link", { name: "Collection" }).click();
        await page.waitForTimeout(latency);
    });
    

    test("search a agit", async ({ page }) => {
        await page.getByRole("button", { name: "Logout" }).click();
        await page.waitForTimeout(latency);
        await page.getByPlaceholder("Search").click();
        await page.fill('[placeholder="Search"]','logout test');
        await page.waitForTimeout(latency);
        await page.press('[placeholder="Search"]', 'Enter');
        await page.waitForTimeout(latency);
        // await page.getByText('Agit').click();
        await page.locator('[data-node-hydration="18"]').click();
        await page.waitForTimeout(latency);
        await page.getByText('logout test').first().click();
        await page.waitForTimeout(latency);
    });

    test("search a collection", async ({ page }) => {
        await page.getByRole("button", { name: "Logout" }).click();
        await page.waitForTimeout(latency);
        await page.getByPlaceholder("Search").click();
        await page.fill('[placeholder="Search"]','logout test');
        await page.waitForTimeout(latency);
        await page.press('[placeholder="Search"]', 'Enter');
        await page.waitForTimeout(latency);
        // await page.getByText('Collection').click();
        await page.locator('[data-node-hydration="21"]').click();
        await page.waitForTimeout(latency);
        await page.getByText('logout test').first().click();
        await page.waitForTimeout(latency);
    });

    test("search a NFT", async ({ page }) => {
        await page.getByRole("button", { name: "Logout" }).click();
        await page.waitForTimeout(latency);
        await page.getByPlaceholder("Search").click();
        await page.fill('[placeholder="Search"]','logout test');
        await page.waitForTimeout(latency);
        await page.press('[placeholder="Search"]', 'Enter');
        await page.waitForTimeout(latency);
        // await page.getByText('NFT').click();
        await page.locator('[data-node-hydration="24"]').click();
        await page.waitForTimeout(latency);
        await page.getByText('logout test').first().click();
        await page.waitForTimeout(latency);
    });

    test("test to go my profile", async ({ page }) => {
        await page.getByRole("button", { name: "Logout" }).click();
        await page.waitForTimeout(latency);
        await page
        .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
        .click();
        await page.waitForTimeout(latency);
        await expect(page.locator('body')).toContainText('Connect wallet');
        await page.waitForTimeout(latency);
    });

    test("check a create button invisible", async ({ page }) => {
        await page.getByRole("button", { name: "Logout" }).click();
        await page.waitForTimeout(latency);
        await expect(page.locator('[data-dioxus-id="12"]')).not.toBeVisible();
        await page.waitForTimeout(latency);
    });

    test("go to collection list of agit", async ({ page }) => {
        await page.getByRole("button", { name: "Logout" }).click();
        await page.waitForTimeout(latency);
        await page.getByPlaceholder("Search").click();
        await page.fill('[placeholder="Search"]','logout test');
        await page.waitForTimeout(latency);
        await page.press('[placeholder="Search"]', 'Enter');
        await page.waitForTimeout(latency);
                // await page.getByText('Agit').click();
        await page.locator('[data-node-hydration="18"]').click();
        await page.waitForTimeout(latency);
        await page.getByText('logout test').first().click();
        await page.waitForTimeout(latency);
    });

    test("go to DAO list of agit", async ({ page }) => {
        await page.getByRole("button", { name: "Logout" }).click();
        await page.waitForTimeout(latency);
        await page.getByPlaceholder("Search").click();
        await page.fill('[placeholder="Search"]','logout test');
        await page.waitForTimeout(latency);
        await page.press('[placeholder="Search"]', 'Enter');
        await page.waitForTimeout(latency);
        // await page.getByText('Agit').click();
        await page.locator('[data-node-hydration="18"]').click();
        await page.waitForTimeout(latency);
        await page.getByText('logout test').first().click();
        await page.waitForTimeout(latency);
        await page.getByText('DAO').click();
        await page.waitForTimeout(latency);
    });

    test("check the proposal create button invisible", async ({ page }) => {
        await page.getByRole("button", { name: "Logout" }).click();
        await page.waitForTimeout(latency);
        await page.getByPlaceholder("Search").click();
        await page.fill('[placeholder="Search"]','logout test');
        await page.waitForTimeout(latency);
        await page.press('[placeholder="Search"]', 'Enter');
        await page.waitForTimeout(latency);
        // await page.getByText('Agit').click();
        await page.locator('[data-node-hydration="18"]').click();
        await page.waitForTimeout(latency);
        await page.getByText('logout test').first().click();
        await page.waitForTimeout(latency);
        await page.getByText('DAO').click();
        await page.waitForTimeout(latency);
        await expect(page.getByText('Create Proposal')).not.toBeVisible();
        await page.waitForTimeout(latency);
    });
});