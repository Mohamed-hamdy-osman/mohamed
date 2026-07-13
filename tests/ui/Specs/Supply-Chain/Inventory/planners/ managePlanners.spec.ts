import { test } from '@playwright/test';
import { ManagePlannersPage } from '../../../../Pages/Supply-Chain/inventory/planners/ managePlanners';

let plannersPage!: ManagePlannersPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  plannersPage = new ManagePlannersPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('networkidle');

  console.log(`Test start: ${testInfo.title}`);


});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Planners Page', async () => {

  await plannersPage.navigateToPlanners();
  await plannersPage.verifyNavigationToPlanners();

});