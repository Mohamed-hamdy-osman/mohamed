import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/Login/loginPage';
import { ManageAssignedBranchesPage } from '../../../../Pages/Supply-Chain/inventory/assigned-branches/manageAssignedBranches';



let loginPage!: LoginPage;
let assignedBranchesPage!: ManageAssignedBranchesPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  loginPage = new LoginPage(page);
  assignedBranchesPage = new ManageAssignedBranchesPage(page);

  console.log(`Test start: ${testInfo.title}`);

await loginPage.navigateToApp();

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Assigned Branches Page', async () => {

  await assignedBranchesPage.navigateToAssignedBranches();
  await assignedBranchesPage.verifyNavigationToAssignedBranches();

});