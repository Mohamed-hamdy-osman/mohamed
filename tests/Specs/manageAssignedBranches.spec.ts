import { test } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { ManageAssignedBranchesPage } from '../Pages/manageAssignedBranches';

let loginPage!: LoginPage;
let assignedBranchesPage!: ManageAssignedBranchesPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  assignedBranchesPage = new ManageAssignedBranchesPage(page);

  await loginPage.goto();

  console.log(`Test start: ${testInfo.title}`);

  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Assigned Branches Page', async () => {

  await assignedBranchesPage.navigateToAssignedBranches();
  await assignedBranchesPage.verifyNavigationToAssignedBranches();

});