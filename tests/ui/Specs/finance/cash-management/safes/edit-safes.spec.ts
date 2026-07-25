import { test } from '@playwright/test';
import { ManageSafesPage } from '../../../../Pages/finance/CashManagement/Safes/manageSafes';
import { EditSafesPage } from '../../../../Pages/finance/CashManagement/Safes/editSafes';

let manageSafesPage!: ManageSafesPage;
let editSafesPage!: EditSafesPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {

  manageSafesPage = new ManageSafesPage(page);
  editSafesPage = new EditSafesPage(page);

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test start: ${testInfo.title}`);

  await page.locator('.loader-wrapper').waitFor({
    state: 'hidden'
  });
});

test.afterEach(async ({ page }, testInfo) => {

  await page.goto('/zeta/choose-module');
  await page.waitForLoadState('load');

  console.log(`Test end: ${testInfo.title}`);
});

test('Verify Edit Safes', async () => {

  await manageSafesPage.navigateToManageSafes();

  await manageSafesPage.verifyNavigationToManageSafes();

  await editSafesPage.editSafe();

}); 