import { test } from '@playwright/test';
import { ManageAssignedBranchesPage } from '../../../../Pages/Supply-Chain/inventory/assigned-branches/manage-assigned-branches';



let assignedBranchesPage!: ManageAssignedBranchesPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {

  assignedBranchesPage = new ManageAssignedBranchesPage(page);

  await page.goto('/zeta/choose-module');
await page.waitForLoadState('load');
  console.log(`Test start: ${testInfo.title}`);


});

test.afterEach(async ({ page }, testInfo) => {
    await page.goto('/zeta/choose-module');
    await page.waitForLoadState('load');
    console.log(`Test end: ${testInfo.title}`);
});

test('Verify Navigation To Assigned Branches Page', async () => {

  await assignedBranchesPage.navigateToAssignedBranches();
  await assignedBranchesPage.verifyNavigationToAssignedBranches();

});