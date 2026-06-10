import { test } from '@playwright/test';
import { ManagePlannersPage } from '../../../../Pages/Supply-Chain/inventory/planners/ managePlanners';

let plannersPage!: ManagePlannersPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  plannersPage = new ManagePlannersPage(page);

  console.log(`Test start: ${testInfo.title}`);

await page.goto("/");

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Planners Page', async () => {

  await plannersPage.navigateToPlanners();
  await plannersPage.verifyNavigationToPlanners();

});