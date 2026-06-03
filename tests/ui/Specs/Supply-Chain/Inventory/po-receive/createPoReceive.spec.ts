import { test } from '@playwright/test';

import { LoginPage } from '../../../../Pages/Login/loginPage';
import { ManagePOReceivePage } from '../../../../Pages/Supply-Chain/inventory/po-receive/managePoReceive';
import { CreatePOReceivePage } from '../../../../Pages/Supply-Chain/inventory/po-receive/createPoReceive';

let loginPage: LoginPage;

let managePOReceivePage: ManagePOReceivePage;

let createPOReceivePage: CreatePOReceivePage;

test.setTimeout(120000);

test.beforeEach(async ({ page }) => {

  loginPage = new LoginPage(page);

  managePOReceivePage =
    new ManagePOReceivePage(page);

  createPOReceivePage =
    new CreatePOReceivePage(page);

  await loginPage.goto();

  await loginPage.login(
    'admin@zeta.com',
    'P@ssw0rd'
  );

  await loginPage.verifyLoginSuccessWithCorporate();

});

test(
  'Verify Create PO Receive',
  async () => {

    await managePOReceivePage
      .navigateToPOReceive();

    await createPOReceivePage
      .startCreatePOReceive();

    await createPOReceivePage
      .selectFirstPO();

    await createPOReceivePage
      .selectLinesAndFillQty();

    await createPOReceivePage
      .editReceivedLine();

    await createPOReceivePage
      .savePOReceive();

  }
);