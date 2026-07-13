import { test } from '@playwright/test';

import { ManagePOReceivePage } from '../../../../Pages/Supply-Chain/inventory/po-receive/managePoReceive';
import { CreatePOReceivePage } from '../../../../Pages/Supply-Chain/inventory/po-receive/createPoReceive';


let managePOReceivePage: ManagePOReceivePage;

let createPOReceivePage: CreatePOReceivePage;

test.setTimeout(120000);

test.beforeEach(async ({ page }) => {


  managePOReceivePage =
    new ManagePOReceivePage(page);

  createPOReceivePage =
    new CreatePOReceivePage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('networkidle');



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