// @ts-check
import { test, expect } from "@playwright/test";
import path from "path";
test.describe("Create", () => {
  // create a new Agit
  test("AGIT", async ({ page }) => {
    //dev d.AGIT 페이지로 이동
    await page.goto("http://dev.dagit.club/ko/");
    await page.waitForTimeout(1000);
    // Create 버튼 클릭
    await page.getByText("Create", { exact: true }).click();
    await page.waitForTimeout(1000);
    // 아지트 생성 버튼 클릭
    await page.getByText("Build an agit", { exact: true }).click();
    await page.waitForTimeout(1000);
    // 아지트 이름 입력
    await page.getByPlaceholder("아지트 입력", { exact: true }).fill("d.AGIT");
    await page.waitForTimeout(1000);
    // 아지트 설명 입력
    await page
      .getByPlaceholder("아지트 설명 입력", { exact: true })
      .fill("Test");
    await page.waitForTimeout(1000);
    //프로필 이미지 영역 선택
    let fileChooserPromise = page.waitForEvent("filechooser");
    let element = await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div[1]/div/label/div/div'
      )
      .click();
    await page.waitForTimeout(1000);
    //프로필 이미지 삽입
    let fileChooser = await fileChooserPromise;
    // await page.getByRole("img", { name: "agit_logo" }).click();
    await fileChooser.setFiles(path.join(__dirname, "Agit_profile.png"));
    await page.waitForTimeout(1000);
    //배너 이미지 영역 선택
    fileChooserPromise = page.waitForEvent("filechooser");
    element = await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div[2]/div/label/div/div/div/label/div'
      )
      .click();
    await page.waitForTimeout(1000);
    //배너 이미지 삽입
    fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, "Agit_Banner.png"));
    await page.waitForTimeout(1000);
    //Create 버튼 클릭
    await page.getByRole("button", { name: "Create" }).click();
    await page.waitForTimeout(1000);
  });

  // create a new collection
  test("Collection", async ({ page }) => {
    //dev d.AGIT 페이지로 이동
    await page.goto("http://dev.dagit.club/ko/");
    await page.waitForTimeout(1000);
    // Create 버튼 클릭
    await page.getByText("Create", { exact: true }).click();
    await page.waitForTimeout(1000);
    // 콜렉션 생성 버튼 클릭
    await page.getByText("Drop a collection", { exact: true }).click();
    await page.waitForTimeout(1000);
    //콜렉션이 생성 될 아지트 선택
    await page.selectOption("select", { value: "38" });
    await page.waitForTimeout(1000);
    //콜렉션 이름 입력
    await page
      .getByPlaceholder("콜렉션 이름 입력", { exact: true })
      .fill("d.AGIT");
    await page.waitForTimeout(1000);
    //콜렉션 설명 입력
    await page
      .getByPlaceholder("콜렉션 설명 입력", { exact: true })
      .fill("Test");
    await page.waitForTimeout(1000);
    //프로필 이미지 영역 선택
    let fileChooserPromise = page.waitForEvent("filechooser");
    let element = await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div[1]/div/label/div/div/div/label/div'
      )
      .click();
    await page.waitForTimeout(1000);
    //프로필 이미지 삽입
    let fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, "Collection_profile.png"));
    //배너 이미지 영역 선택
    fileChooserPromise = page.waitForEvent("filechooser");
    element = await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div[2]/div/label/div/div/div/label/div'
      )
      .click();
    await page.waitForTimeout(1000);
    //배너 이미지 삽입
    fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, "Collection_Banner.png"));
    await page.waitForTimeout(1000);
    //Create 버튼 클릭
    await page.getByRole("button", { name: "Create" }).click();
    await page.waitForTimeout(5000);
  });

  // create a new NFT
  test("NFT", async ({ page }) => {
    //dev d.AGIT 페이지로 이동
    await page.goto("http://dev.dagit.club/ko/");
    await page.waitForTimeout(1000);
    // Create 버튼 클릭
    await page.getByText("Create", { exact: true }).click();
    await page.waitForTimeout(1000);
    // NFT 생성 버튼 클릭
    await page.getByText("Mint a NFT", { exact: true }).click();
    await page.waitForTimeout(1000);
    //NFT가 생성 될 아지트 선택
    await page.selectOption("select", { value: "40" });
    await page.waitForTimeout(1000);
    //NFT 이름 입력
    await page
      .getByPlaceholder("NFT 이름 입력", { exact: true })
      .fill("Incheon_Heroes_Test");
    await page.waitForTimeout(1000);
    //NFT 설명 입력
    await page.getByPlaceholder("NFT 설명 입력", { exact: true }).fill("Test");
    await page.waitForTimeout(1000);
    //프로필 이미지 영역 선택
    let fileChooserPromise = page.waitForEvent("filechooser");
    let element = await page
      .locator(
        'xpath=//*[@id="main"]/div[1]/div[1]/div/div[2]/div/div[1]/div[3]/div/div/label/div/div/div'
      )
      .click();
    await page.waitForTimeout(1000);
    //NFT 이미지 삽입
    let fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(
      path.join(__dirname, "Incheon Heroes #1283.png")
    );
    await page.waitForTimeout(1000);
    // Create 버튼 클릭
    await page.getByRole("button", { name: "Create" }).click();
    await page.waitForTimeout(5000);
  });
});
