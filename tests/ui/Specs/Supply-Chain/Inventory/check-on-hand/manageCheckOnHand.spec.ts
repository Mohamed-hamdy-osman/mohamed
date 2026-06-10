import { test } from '@playwright/test';
import { ManageCheckOnHandPage } from '../../../../Pages/Supply-Chain/inventory/check-on-hand/manageCheckOnHand';

let checkOnHandPage!: ManageCheckOnHandPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  // initialize pages
  checkOnHandPage = new ManageCheckOnHandPage(page);

  // open system
  console.log(`Test start: ${testInfo.title}`);

  // login
  // verify login
await page.goto("/");

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Check-On Hand Page', async () => {

  await checkOnHandPage.navigateToCheckOnHand();

});

test('Verify Click On Check Button', async () => {

  await checkOnHandPage.navigateToCheckOnHand();

  await checkOnHandPage.clickCheckButton();

});