import { test } from '@playwright/test';
import { ManageAssignedBranchesPage } from '../../../../Pages/Supply-Chain/inventory/assigned-branches/manageAssignedBranches';



let assignedBranchesPage!: ManageAssignedBranchesPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  assignedBranchesPage = new ManageAssignedBranchesPage(page);

  console.log(`Test start: ${testInfo.title}`);

await page.goto("/");

});

test.afterEach(async ({}, testInfo) => {

  console.log(`Test end: ${testInfo.title}`);

});

test('Verify Navigation To Assigned Branches Page', async () => {

  await assignedBranchesPage.navigateToAssignedBranches();
  await assignedBranchesPage.verifyNavigationToAssignedBranches();

});