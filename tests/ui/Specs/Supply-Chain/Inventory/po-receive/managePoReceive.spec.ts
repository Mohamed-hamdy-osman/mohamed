import { test } from '@playwright/test';
import { ManagePOReceivePage } from '../../../../Pages/Supply-Chain/inventory/po-receive/managePoReceive';
let poReceivePage!: ManagePOReceivePage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  poReceivePage = new ManagePOReceivePage(page);

  await page.goto('/zeta/choose-module');
await page.waitForLoadState('networkidle');
  console.log(`Test start: ${testInfo.title}`);

});
test.afterEach(async ({ page }, testInfo) => {
    await page.goto('/zeta/choose-module');
    await page.waitForLoadState('networkidle');
    console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Manage PO Receive Page', async () => {
  await poReceivePage.navigateToPOReceive();
  await poReceivePage.verifyNavigationToPOReceive();
});
