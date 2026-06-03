import { expect, test } from '@playwright/test';

import { LoginPage } from '../../../../Pages/Login/loginPage';
import { ManagePOInspectionPage } from '../../../../Pages/Supply-Chain/inventory/po-inspections/managePoInspection';
import { CreatePOInspectionPage } from '../../../../Pages/Supply-Chain/inventory/po-inspections/createPoInspection';

let loginPage: LoginPage;

let managePOInspectionPage: ManagePOInspectionPage;

let createPOInspectionPage: CreatePOInspectionPage;

test.setTimeout(90000);

test.beforeEach(async ({ page }) => {

  loginPage = new LoginPage(page);

  managePOInspectionPage =
    new ManagePOInspectionPage(page);

  createPOInspectionPage =
    new CreatePOInspectionPage(page);

  await loginPage.goto();

  await loginPage.login(
    'admin@zeta.com',
    'P@ssw0rd'
  );

  await loginPage.verifyLoginSuccessWithCorporate();

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