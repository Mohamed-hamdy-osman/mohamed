import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/login/loginPage';
import { ManageDepartmentsPage } from '../../../../Pages/HR-Module/Personal/Departments/manageDepartments';
import { CreateDepartmentPage } from '../../../../Pages/HR-Module/Personal/Departments/createDepartment';

let loginPage: LoginPage;
let manageDepartmentsPage: ManageDepartmentsPage;
let createDepartmentPage: CreateDepartmentPage;

test.describe('Create Department Module', () => {

  test.setTimeout(120000);

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    manageDepartmentsPage = new ManageDepartmentsPage(page);
    createDepartmentPage = new CreateDepartmentPage(page);

    await test.step('Login and Navigate to Departments', async () => {
      await loginPage.goto();
      await loginPage.login('admin@zeta.com', 'P@ssw0rd');
      await loginPage.verifyLoginSuccessWithCorporate();
      await manageDepartmentsPage.navigateToDepartments();
    });
  });

  test('TC01 - Verify Successful Creation of a New Department', async () => {
    const randomDeptName = `Dept-${Math.floor(Math.random() * 9000) + 1000}`;

    await test.step('Click Create Button', async () => {
      await manageDepartmentsPage.create_btn.click();
    });

    await createDepartmentPage.fillDepartmentDetails(
      randomDeptName,
      0
    );

    await createDepartmentPage.saveDepartment(randomDeptName);

  });

});
