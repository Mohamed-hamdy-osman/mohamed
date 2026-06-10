import { test } from '@playwright/test';
import { ManageUnitOfMeasurePage } from '../../../../Pages/Supply-Chain/inventory/uom-inventory/ manageUnitOfMeasure';

let unitPage!: ManageUnitOfMeasurePage;
test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  unitPage = new ManageUnitOfMeasurePage(page);

  console.log(`Test start: ${testInfo.title}`);

await page.goto("/");

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Unit Of Measure Page', async () => {

  await unitPage.navigateToUnitOfMeasure();
  await unitPage.verifyNavigationToUnitOfMeasure();

});