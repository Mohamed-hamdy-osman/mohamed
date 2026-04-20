import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/loginPage';
import { ManageDepartmentsPage } from '../../../../Pages/HR-Module/Personal/Departments/manageDepartments';

let loginPage: LoginPage;
let manageDepartmentsPage: ManageDepartmentsPage;

test.describe('Manage Departments Module', () => {

  test.setTimeout(120000); // 2 minutes

  test.beforeEach(async ({ page }, testInfo) => {
    loginPage = new LoginPage(page);
    manageDepartmentsPage = new ManageDepartmentsPage(page);

    await test.step('Login to the system', async () => {
      await loginPage.goto();
      await loginPage.login('admin@zeta.com', 'P@ssw0rd');
      await loginPage.verifyLoginSuccessWithCorporate();
    });

    console.log(`Test start: ${testInfo.title}`);
  });

  test.afterEach(async ({}, testInfo) => {
    console.log(`Test end: ${testInfo.title}`);
  });

  test('TC01 - Verify Navigation To Manage Departments Page', async () => {
    await manageDepartmentsPage.navigateToDepartments();
    await manageDepartmentsPage.verifyNavigationToManageDepartments();
  });

  test('TC02 - Verify Search Department by Name then by Status after Clear', async () => {
    await manageDepartmentsPage.navigateToDepartments();
    
    // 1. Search by name IT
    await manageDepartmentsPage.searchDepartment('IT');
    await manageDepartmentsPage.verifySearchResult();
    
    // 2. Clear filters
    await manageDepartmentsPage.clearFilters();
    
    // 3. Search by Status Inactive
    await manageDepartmentsPage.searchDepartment(undefined, 'Inactive');
    await manageDepartmentsPage.verifySearchResult();
  });

});