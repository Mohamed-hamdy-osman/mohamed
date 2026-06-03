import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/login/loginPage';
import { ManageGradesPage } from '../../../../Pages/HR-Module/Personal/Grades/manageGrades';
import { CreateGradePage } from '../../../../Pages/HR-Module/Personal/Grades/createGrade';

let loginPage: LoginPage;
let manageGradesPage: ManageGradesPage;
let createGradePage: CreateGradePage;

test.describe('Edit Grade Module - Sequential Field Testing', () => {

  test.setTimeout(240000); // 4 minutes

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    manageGradesPage = new ManageGradesPage(page);
    createGradePage = new CreateGradePage(page);

    await test.step('Login and Navigate to Grades', async () => {
      await loginPage.goto();
      await loginPage.login('admin@zeta.com', 'P@ssw0rd');
      await loginPage.verifyLoginSuccessWithCorporate();
      await manageGradesPage.navigateToGrades();
    });
  });

  test('TC02 - Verify Sequential Editing of All Fields', async () => {
    const timestamp = new Date().getTime();

    // Ensure we have a grade to edit
    await test.step('Search for Grade', async () => {
      await manageGradesPage.searchGrade();
      await manageGradesPage.verifySearchResult();
    });

    // 1. Edit Code
    await test.step('Update Code Only', async () => {
      await manageGradesPage.edit_btn.first().click();
      const newCode = `CODE-${timestamp}`;
      await createGradePage.code_textbox.fill(newCode);
      await createGradePage.saveGrade(newCode);
    });

    // 2. Edit Title
    await test.step('Update Title Only', async () => {
      await manageGradesPage.edit_btn.first().click();
      const newTitle = `Title-${timestamp}`;
      await createGradePage.title_textbox.fill(newTitle);
      await createGradePage.saveGrade(newTitle);
      
      // Verify via Search
      await manageGradesPage.searchGrade(newTitle);
      await manageGradesPage.verifySearchResult();
    });

    // 3. Edit Salary Range
    await test.step('Update Salary Range', async () => {
      await manageGradesPage.edit_btn.first().click();
      await createGradePage.minSalary_textbox.fill('7500');
      await createGradePage.maxSalary_textbox.fill('15000');
      await createGradePage.saveGrade('Salary Update');
    });

    // 4. Edit Experience
    await test.step('Update Experience Year', async () => {
      await manageGradesPage.edit_btn.first().click();
      await createGradePage.yearsOfExperience_textbox.fill('4');
      await createGradePage.saveGrade('Experience Update');
    });
  });
});
