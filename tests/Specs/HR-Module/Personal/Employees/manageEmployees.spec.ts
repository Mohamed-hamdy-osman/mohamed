import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../../Pages/login/loginPage';
import { ManageEmployeesPage } from '../../../../Pages/HR-Module/Personal/Employees/manageEmployees';

let loginPage: LoginPage;
let manageEmployeesPage: ManageEmployeesPage;

test.describe('Manage Employees Module - Search Functional Testing', () => {

  test.setTimeout(240000); // 4 minutes

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    manageEmployeesPage = new ManageEmployeesPage(page);

    await test.step('Navigate to Employees using saved session', async () => {
      // Go to base URL
      await loginPage.goto();

      // Wait for the SPA to automatically redirect to the module selection screen using our saved session
      await page.waitForURL(/choose-module/, { timeout: 30000 });

      
      // Navigate to employees module (starts by clicking Human Resources card on the choose-module screen)
      await manageEmployeesPage.navigateToEmployees();
    });
  });

  test('TC01 - Verify Navigation to Employees Page', async () => {
    await manageEmployeesPage.verifyNavigationToManageEmployees();
  });

  test('TC02 - Verify Search Employee by Multiple Filters', async () => {
    
    // 1. Search by Name
    await test.step('Search by Name using an existing employee', async () => {
        // We ensure no filters are applied first
        await manageEmployeesPage.clearFilters();
        
        // Pick an existing employee name
        const employeeName = await manageEmployeesPage.getFirstEmployeeName();
        if (employeeName) {
            await manageEmployeesPage.searchEmployeeByName(employeeName);
            await manageEmployeesPage.verifySearchResult();
        } else {
            console.log('No employees found to search by name. Skipping Name Search.');
        }
    });

    await test.step('Clear search after Name', async () => {
        await manageEmployeesPage.clearFilters();
    });

    // 2. Search by Status
    await test.step('Search by Status - All', async () => {
        await manageEmployeesPage.searchByDropdown(0, 0); // Status = Index 0, All = Item 0
        await manageEmployeesPage.verifySearchResult();
    });
    await test.step('Clear search after Status All', async () => {
        await manageEmployeesPage.clearFilters();
    });

    await test.step('Search by Status - Inactive', async () => {
        await manageEmployeesPage.searchByDropdown(0, 1); // Status = Index 0, Inactive = Item 1
        await manageEmployeesPage.verifySearchResult();
    });
    await test.step('Clear search after Status Inactive', async () => {
        await manageEmployeesPage.clearFilters();
    });

    await test.step('Search by Status - Active', async () => {
        await manageEmployeesPage.searchByDropdown(0, 2); // Status = Index 0, Active = Item 2
        await manageEmployeesPage.verifySearchResult();
    });
    await test.step('Clear search after Status Active', async () => {
        await manageEmployeesPage.clearFilters();
    });

    // 3. Search by Job
    await test.step('Search by Job - Selection 1', async () => {
        await manageEmployeesPage.searchByDropdown(2, 0); // Job = Index 2
        await manageEmployeesPage.verifySearchResult();
    });
    await test.step('Clear search after Job 1', async () => {
        await manageEmployeesPage.clearFilters();
    });
    await test.step('Search by Job - Selection 2', async () => {
        await manageEmployeesPage.searchByDropdown(2, 1); // Job = Index 2
        await manageEmployeesPage.verifySearchResult();
    });
    await test.step('Clear search after Job 2', async () => {
        await manageEmployeesPage.clearFilters();
    });

    // 4. Search by Department
    await test.step('Search by Department - Selection 1', async () => {
        await manageEmployeesPage.searchByDropdown(1, 0); // Department = Index 1
        await manageEmployeesPage.verifySearchResult();
    });
    await test.step('Clear search after Department 1', async () => {
        await manageEmployeesPage.clearFilters();
    });
    await test.step('Search by Department - Selection 2', async () => {
        await manageEmployeesPage.searchByDropdown(1, 1); // Department = Index 1
        await manageEmployeesPage.verifySearchResult();
    });
    await test.step('Clear search after Department 2', async () => {
        await manageEmployeesPage.clearFilters();
    });

  });

});
