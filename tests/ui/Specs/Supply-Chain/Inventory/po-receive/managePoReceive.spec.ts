import { test } from '@playwright/test';
import { ManagePOReceivePage } from '../../../../Pages/Supply-Chain/inventory/po-receive/managePoReceive';
let poReceivePage!: ManagePOReceivePage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  poReceivePage = new ManagePOReceivePage(page);

  console.log(`Test start: ${testInfo.title}`);
await page.goto("/");

});
test.afterEach(async ({}, testInfo) => {
  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Manage PO Receive Page', async () => {
  await poReceivePage.navigateToPOReceive();
  await poReceivePage.verifyNavigationToPOReceive();
});
