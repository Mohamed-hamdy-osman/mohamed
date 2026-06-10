import { test } from '@playwright/test';
import { ManageUnitOfMeasurePage } from '../../../../Pages/Supply-Chain/inventory/uom-inventory/ manageUnitOfMeasure';

let unitPage!: ManageUnitOfMeasurePage;
test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  unitPage = new ManageUnitOfMeasurePage(page);

  await page.goto('/zeta');

  console.log(`Test start: ${testInfo.title}`);


});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Unit Of Measure Page', async () => {

  await unitPage.navigateToUnitOfMeasure();
  await unitPage.verifyNavigationToUnitOfMeasure();

});