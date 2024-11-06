import { test, expect } from "@playwright/test";
import {
    image_path,
    latency,
    agit_name,
    collection_name,
    nft_name,
} from "./constants";
import path from "path";


test.describe.serial("agit test", () => {
    test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(latency);
    });

    test("go to agit list", async ({ page }) => {
    await page
        .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
        .click();
    await page.waitForTimeout(latency);
    await page.getByText("My Agit", { exact: true }).click();
    await page.waitForTimeout(latency);
    });
    
    test("make a proposal", async ({ page }) => {
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
        await page.getByText("등록", { exact: true }).click();
        await page.waitForLoadState();
    });
    
    test("check a proposal list", async ({ page }) => {
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
    });

    test("proposal voting", async ({ page }) => {
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
        await page.getByText("DAO 테스트", { exact: true }).click();
        await page.waitForTimeout(latency);
        await page.getByText("추천", { exact: true }).click();
        await page.waitForTimeout(latency);
    });
    
    test("make comment in proposal", async ({ page }) => {
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
    await page.getByText("DAO 테스트", { exact: true }).click();
    await page.waitForTimeout(latency);
    await page.locator('textarea[placeholder="댓글을 남겨주세요."]').fill("test");
    await page.waitForTimeout(latency);
    await page.press('textarea[placeholder="댓글을 남겨주세요."]', 'Enter');
    await page.waitForTimeout(latency);
    });
    
    test("click a like to proposal", async ({ page }) => {
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
        await page.getByText("DAO 테스트", { exact: true }).click();
        await page.waitForTimeout(latency);
        await page.locator('svg.fill-gray-600').click();
        await page.waitForTimeout(latency);
    });

    test("follow a agit", async ({ page }) => {
        await page
            .locator('xpath=//*[@id="main"]/div[1]/div[4]/header/div/div[2]/div')
            .click();
            await page.waitForTimeout(latency);
            await page.getByText('My Agit', { exact: true }).click();
            await page.waitForTimeout(latency);
            await page.getByText(agit_name, { exact: true }).click();
            await page.waitForTimeout(latency);
            await page.getByRole("button", { name: "Follow" }).click();
            await page.waitForTimeout(latency);
        });
    });