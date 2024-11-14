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

test.describe("My profile", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.waitForTimeout(latency);
    });

    test("[My profile-001] Edit a profile", async ({ page }) => {
        await page
            .locator(
                'xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div'
            )
            .click();
        await page.waitForTimeout(latency);
        await page.screenshot({
            path: screenshot_path(
                "My profile",
                "edit-a-profile",
                "1-go-to-my-profile"
            ),
            fullPage: true,
        });
        await page.getByText("Edit Profile", { exact: true }).click();
        await page.waitForTimeout(latency);
        await page.screenshot({
            path: screenshot_path(
                "My profile",
                "edit-a-profile",
                "2-go-to-edit-profile"
            ),
            fullPage: true,
        });
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
        await page.screenshot({
            path: screenshot_path(
                "My profile",
                "edit-a-profile",
                "3-fill-in-profile-info"
            ),
            fullPage: true,
        });
        await page.getByText("완료", { exact: true }).click();
        await page.waitForTimeout(latency);
        await page.screenshot({
            path: screenshot_path(
                "My profile",
                "edit a profile",
                "4-check-complete"
            ),
            fullPage: true,
        });
    });

    test("[My profile-002] Check a Creative credit", async ({ page }) => {
        await page
            .locator(
                'xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div'
            )
            .click();
        await page.waitForTimeout(latency);
        await page.screenshot({
            path: screenshot_path(
                "My profile",
                "check-a-creative-credit",
                "1-check-creative-credit"
            ),
            fullPage: true,
        });
    });

    test("[My profile-003] Check a creative credit earnings", async ({
        page,
    }) => {
        await page
            .locator(
                'xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div'
            )
            .click();
        await page.waitForTimeout(latency);
        await page.screenshot({
            path: screenshot_path(
                "My profile",
                "check-a-creative-credit",
                "1-go-to-my-profile"
            ),
            fullPage: true,
        });
        await page
            .locator(
                'xpath=//*[@id="main"]/div[1]/div[4]/div[3]/div[1]/div/div[2]/button[2]/div'
            )
            .click();
        await page.waitForTimeout(latency);
        await page.screenshot({
            path: screenshot_path(
                "My profile",
                "check-a-creative-credit",
                "2-go-to-cc-history"
            ),
            fullPage: true,
        });
        await page.getByText("Earnings", { exact: true }).click();
        await page.waitForTimeout(latency);
        await page.screenshot({
            path: screenshot_path(
                "My profile",
                "check-a-creative-credit",
                "3-check-earnings-history"
            ),
            fullPage: true,
        });
    });

    test("[My profile-004] Check a creative credit activity", async ({
        page,
    }) => {
        await page
            .locator(
                'xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div'
            )
            .click();
        await page.waitForTimeout(latency);
        await page.screenshot({
            path: screenshot_path(
                "My profile",
                "check-a-creative-credit-activity",
                "1-go-to-my-profile"
            ),
            fullPage: true,
        });
        await page
            .locator(
                'xpath=//*[@id="main"]/div[1]/div[4]/div[3]/div[1]/div/div[2]/button[2]/div'
            )
            .click();
        await page.waitForTimeout(latency);
        await page.screenshot({
            path: screenshot_path(
                "My profile",
                "check-a-creative-credit-activity",
                "2-go-to-cc-history"
            ),
            fullPage: true,
        });
        await page.getByText("Activity", { exact: true }).click();
        await page.waitForTimeout(latency);
        await page.screenshot({
            path: screenshot_path(
                "My profile",
                "check-a-creative-credit-activity",
                "3-go-to-cc-activity"
            ),
            fullPage: true,
        });
    });

    test("[My profile-005] Created nft list view", async ({ page }) => {
        await page
            .locator(
                'xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div'
            )
            .click();
        await page.waitForTimeout(latency);
        await page.screenshot({
            path: screenshot_path(
                "My profile",
                "shows-a-created-nft-list",
                "1-go-to-my-profile"
            ),
            fullPage: true,
        });
    });

    test("[My profile-006] Created agit list view", async ({ page }) => {
        await page
            .locator(
                'xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div'
            )
            .click();
        await page.waitForTimeout(latency);
        await page.screenshot({
            path: screenshot_path(
                "My profile",
                "go-to-created-agit-list",
                "1-go-to-my-profile"
            ),
            fullPage: true,
        });
        await page.getByText("My Agit", { exact: true }).click();
        await page.waitForTimeout(latency);
        await page.screenshot({
            path: screenshot_path(
                "My profile",
                "go-to-created-agit-list",
                "2-go-to-my-agit"
            ),
            fullPage: true,
        });
    });
});
