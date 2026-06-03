import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/login/loginPage';
import { ManageGradesPage } from '../../../../Pages/HR-Module/Personal/Grades/manageGrades';
import { CreateGradePage } from '../../../../Pages/HR-Module/Personal/Grades/createGrade';

let loginPage: LoginPage;
let manageGradesPage: ManageGradesPage;
let createGradePage: CreateGradePage;

test.describe('Grades Module', () => {

  test.setTimeout(180000); // 3 minutes

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

  test('TC01 - Create New Grade and Verify', async ({ page }) => {
    const timestamp = new Date().getTime();
    const gradeTitle = `Grade-${timestamp}`;
    const gradeCode = `G-${Math.floor(Math.random() * 9999)}`; 

    await test.step('Open Create Dialog', async () => {
      await manageGradesPage.create_btn.click();
    });

    await test.step('Fill and Save Grade', async () => {
      await createGradePage.fillGradeDetails({
        positionIndex: 0,
        code: gradeCode,
        title: gradeTitle,
        minSalary: '5000',
        maxSalary: '10000',
        yearsOfExperience: '2',
        isActive: true
      });
      await createGradePage.saveGrade(gradeTitle);
    });

    await test.step('Search for the Created Grade', async () => {
      await manageGradesPage.searchGrade(gradeTitle);
      await manageGradesPage.verifySearchResult();
    });
  });

});
