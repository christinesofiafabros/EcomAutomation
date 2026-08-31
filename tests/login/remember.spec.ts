import { test, expect, chromium } from '@playwright/test';
import path from 'node:path';
import { LoginPage } from '../../pages/LoginPage';

test('keeps the user logged in after reopening the browser when Remember me is checked', async ({}, testInfo) => {
  // A unique browser profile for this test
  const userDataDir = testInfo.outputPath('remember-me-profile');

  // Session 1: log in with Remember me checked
  let context = await chromium.launchPersistentContext(userDataDir, {
    headless: true,
  });

  let page = await context.newPage();
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.checkRememberMe();

  await expect(loginPage.rememberMe).toBeChecked();

  await loginPage.loginCredentials('demo@demo.com', 'demo');

  await loginPage.login();

  // Replace this with a logged-in-only marker if possible
  await expect(page).toHaveURL(/\/shop\.php$/);

  // Simulate closing the browser
  await context.close();

  // Session 2: reopen browser with the same profile
  context = await chromium.launchPersistentContext(userDataDir, {
    headless: true,
  });

  page = await context.newPage();
  await page.goto('https://shop.qaautomationlabs.com/shop.php');

  // Stronger: use an element shown only to an authenticated user.
  await expect(page).toHaveURL(/\/shop\.php$/);

  await context.close();
});