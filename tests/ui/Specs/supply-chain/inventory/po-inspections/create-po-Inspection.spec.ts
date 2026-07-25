import { expect, test } from '@playwright/test';

import { ManagePOInspectionPage } from '../../../../Pages/Supply-Chain/inventory/po-inspections/managePoInspection';
import { CreatePOInspectionPage } from '../../../../Pages/Supply-Chain/inventory/po-inspections/createPoInspection';


let managePOInspectionPage: ManagePOInspectionPage;

let createPOInspectionPage: CreatePOInspectionPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }) => {


  managePOInspectionPage =
    new ManagePOInspectionPage(page);

  createPOInspectionPage =
    new CreatePOInspectionPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');



});

test('Verify Create PO Inspection', async () => {

  await managePOInspectionPage
    .navigateToPOInspection();

  await createPOInspectionPage
    .startCreatePOInspection();

  await createPOInspectionPage
    .selectFirstPO();

  await createPOInspectionPage
    .selectLinesAndFillQty();

  await createPOInspectionPage
    .savePOInspection();

  // Assertions
  await createPOInspectionPage
    .waitForLoader();

  await expect(
    createPOInspectionPage.page
  ).toHaveURL(/po-inspection/);

});