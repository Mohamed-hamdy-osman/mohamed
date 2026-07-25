import { test } from '@playwright/test';
import { ManageCheckOnHandPage } from '../../../../Pages/Supply-Chain/inventory/check-on-hand/manage-check-on-hand';

let checkOnHandPage!: ManageCheckOnHandPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  // initialize pages
  checkOnHandPage = new ManageCheckOnHandPage(page);

  // open system
  await page.goto('/zeta/choose-module');
await page.waitForLoadState('load');
  console.log(`Test start: ${testInfo.title}`);

  // login

  // verify login

});

test.afterEach(async ({ page }, testInfo) => {
    await page.goto('/zeta/choose-module');
    await page.waitForLoadState('load');
    console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Check-On Hand Page', async () => {

  await checkOnHandPage.navigateToCheckOnHand();

});

test('Verify Click On Check Button', async () => {

  await checkOnHandPage.navigateToCheckOnHand();

  await checkOnHandPage.clickCheckButton();

});