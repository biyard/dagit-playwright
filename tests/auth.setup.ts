import { test as setup, expect } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("http://dev.dagit.club/ko/");
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Connect Wallet" }).click();
  await page.waitForTimeout(1000);
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Log in with Google" }).click();
  const page1 = await page1Promise;
  await page1.getByLabel("Email or phone").click();
  await page1.getByLabel("Email or phone").fill("dagittest@gmail.com");
  await page1.getByRole("button", { name: "Next" }).click();
  await page1.getByLabel("Enter your password").click();
  await page1.getByLabel("Enter your password").fill("dagittest11!");
  await page1.getByRole("button", { name: "Next" }).click();
  await page.getByPlaceholder("비밀번호", { exact: true }).fill("dagittest11!");
  await page.getByRole("button", { name: "확인" }).click();
  await page.waitForTimeout(1000);
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  //   await page.waitForURL("https://github.com/");
  //   // Alternatively, you can wait until the page reaches a state where all cookies are set.
  //   await expect(
  //     page.getByRole("button", { name: "View profile and more" })
  //   ).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
