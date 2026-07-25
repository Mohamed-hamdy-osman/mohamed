import { test } from '@playwright/test';
import { ManageFunctionPage } from '../../../../Pages/hr/personal/function/manage-function';

let manageFunctionPage: ManageFunctionPage;

test.describe('Manage Functions Module', () => {

  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    manageFunctionPage = new ManageFunctionPage(page);

      await page.goto('/zeta/choose-module');
  await page.waitForLoadState('networkidle');
      await manageFunctionPage.navigateToFunctions();
  });

  test('TC01 - Verify Navigation to Manage Functions', async () => {
    await manageFunctionPage.verifyNavigationToManageFunctions();
  });

  test('TC02 - Search Function by Name', async () => {
    // Assuming there is at least one function to search for, or using a generic search
    await manageFunctionPage.searchFunction();
    await manageFunctionPage.verifySearchResult();
  });

  test('TC03 - Clear Search Filters', async () => {
    await manageFunctionPage.searchFunction('NonExistentFunction');
    await manageFunctionPage.clearFilters();
    await manageFunctionPage.verifySearchResult(); // Should show all again
  });

});
