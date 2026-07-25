import { test } from '@playwright/test';
import { ManageBanksPage } from '../../../../Pages/finance/CashManagement/Banks/manageBanks';
import { EditBankPage } from '../../../../Pages/finance/CashManagement/Banks/editBanks';

let manageBanksPage!: ManageBanksPage;
let editBankPage!: EditBankPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {

  manageBanksPage = new ManageBanksPage(page);
  editBankPage = new EditBankPage(page);

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

test('Verify Edit Bank', async () => {

  await manageBanksPage.navigateToManageBanks();

  await manageBanksPage.verifyNavigationToManageBanks();

  await editBankPage.editBank();

});