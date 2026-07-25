import { test } from '@playwright/test';
import { ManageSafesPage } from '../../../../Pages/finance/cash-management/safes/manage-safes';
import { CreateSafesPage } from '../../../../Pages/finance/cash-management/safes/create-safes';

let manageSafesPage!: ManageSafesPage;
let createSafesPage!: CreateSafesPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {

  manageSafesPage = new ManageSafesPage(page);
  createSafesPage = new CreateSafesPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test start: ${testInfo.title}`);

  await page.locator('.loader-wrapper').waitFor({
    state: 'hidden'
  });
});

test.afterEach(async ({ page }, testInfo) => {

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Create Safes', async () => {

  await manageSafesPage.navigateToManageSafes();

  await manageSafesPage.verifyNavigationToManageSafes();

  await createSafesPage.createSafe();

});