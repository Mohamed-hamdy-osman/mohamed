import { test } from '@playwright/test';
import { ManagePOInspectionPage } from '../../../../Pages/Supply-Chain/inventory/po-inspections/managePoInspection';
let poInspectionPage!: ManagePOInspectionPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  poInspectionPage = new ManagePOInspectionPage(page);

  console.log(`Test start: ${testInfo.title}`);
await page.goto("/");
});

test.afterEach(async ({}, testInfo) => {
  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Manage PO Inspection Page', async () => {
  await poInspectionPage.navigateToPOInspection();
  await poInspectionPage.verifyNavigationToPOInspection();
});

test('Verify Search With Creation Date From And Creation Date To', async () => {
  await poInspectionPage.navigateToPOInspection();
  await poInspectionPage.creationDateFromAndCreationDateTo();
  await poInspectionPage.searchPOInspection();
  await poInspectionPage.verifySearchResult();
});