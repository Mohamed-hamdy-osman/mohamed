import { test } from '@playwright/test';
import { ManageBanksPage } from '../../../../Pages/Finance/CashManagement/Banks/manageBanks';
import { CreateBankPage } from '../../../../Pages/Finance/CashManagement/Banks/createBanks';


let manageBanksPage!: ManageBanksPage;
let createBankPage!: CreateBankPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {

  manageBanksPage = new ManageBanksPage(page);
  createBankPage = new CreateBankPage(page);

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

test('Verify Create Bank', async () => {

  await manageBanksPage.navigateToManageBanks();

  await manageBanksPage.verifyNavigationToManageBanks();

  await createBankPage.createBank();

});