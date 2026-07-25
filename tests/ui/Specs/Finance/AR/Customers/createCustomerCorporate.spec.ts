import { test } from '@playwright/test';
import { ManageCustomersPage } from '../../../../Pages/Finance/AR/Customers/manageCustomers';
import { CreateCustomerCorporatePage } from '../../../../Pages/Finance/AR/Customers/createCustomerCorporate';


let manageCustomersPage!: ManageCustomersPage;
let createCustomerCorporatePage!: CreateCustomerCorporatePage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {

  manageCustomersPage = new ManageCustomersPage(page);
  createCustomerCorporatePage = new CreateCustomerCorporatePage(page);

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

test('Verify Create Customer Corporate', async () => {

  await manageCustomersPage.navigateToManageCustomers();

  await manageCustomersPage.verifyNavigationToManageCustomers();

  await createCustomerCorporatePage.createCustomerCorporate();

  await createCustomerCorporatePage.verifyCustomerCorporateCreated();

});