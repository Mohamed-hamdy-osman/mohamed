import { test } from '@playwright/test';
import { ManageCustomersPage } from '../../../../Pages/Finance/AR/Customers/manageCustomers';
import { CreateCustomerIndividualPage } from '../../../../Pages/Finance/AR/Customers/createIndividualCustomer';


let manageCustomersPage!: ManageCustomersPage;
let createCustomerIndividualPage!: CreateCustomerIndividualPage;

test.setTimeout(120000);

test.beforeEach(async ({ page }, testInfo) => {

  manageCustomersPage = new ManageCustomersPage(page);
  createCustomerIndividualPage = new CreateCustomerIndividualPage(page);

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

test('Verify Create Customer Individual', async () => {

  await manageCustomersPage.navigateToManageCustomers();

  await manageCustomersPage.verifyNavigationToManageCustomers();

  await createCustomerIndividualPage.createCustomerIndividual();

  await createCustomerIndividualPage.verifyCustomerIndividualCreated();

});