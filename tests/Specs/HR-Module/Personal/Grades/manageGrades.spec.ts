import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/login/loginPage';
import { ManageGradesPage } from '../../../../Pages/HR-Module/Personal/Grades/manageGrades';

let loginPage: LoginPage;
let manageGradesPage: ManageGradesPage;

test.describe('Manage Grades Module - Search Functional Testing', () => {

  test.setTimeout(240000); // 4 minutes

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    manageGradesPage = new ManageGradesPage(page);

    await test.step('Login and Navigate to Grades', async () => {
      await loginPage.goto();
      await loginPage.login('admin@zeta.com', 'P@ssw0rd');
      await loginPage.verifyLoginSuccessWithCorporate();
      await manageGradesPage.navigateToGrades();
    });
  });

  test('TC01 - Verify Navigation to Grades Page', async () => {
    await manageGradesPage.verifyNavigationToManageGrades();
  });

  test('TC02 - Verify Search Grade by Name', async () => {
    const searchName = 'Grade'; // Matching the prefix from createGrade tests
    
    await test.step(`Searching for Grade Name: ${searchName}`, async () => {
        await manageGradesPage.searchGrade(searchName);
        await manageGradesPage.verifySearchResult();
    });

    await test.step('Clear search and verify reset', async () => {
        await manageGradesPage.clearFilters();
    });
  });

});
