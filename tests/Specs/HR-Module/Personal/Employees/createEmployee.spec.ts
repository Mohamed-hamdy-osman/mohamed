import { test } from '@playwright/test';
import { LoginPage } from '../../../../Pages/login/loginPage';
import { ManageEmployeesPage } from '../../../../Pages/HR-Module/Personal/Employees/manageEmployees';
import { CreateEmployeePage } from '../../../../Pages/HR-Module/Personal/Employees/createEmployee';

let loginPage: LoginPage;
let manageEmployeesPage: ManageEmployeesPage;
let createEmployeePage: CreateEmployeePage;

test.describe('Create Employee Module - Functional Testing', () => {

  test.setTimeout(240000); // 4 minutes

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    manageEmployeesPage = new ManageEmployeesPage(page);
    createEmployeePage = new CreateEmployeePage(page);

    await test.step('Login and Navigate to Employees', async () => {
      await loginPage.goto();
      await loginPage.login('admin@zeta.com', 'P@ssw0rd');
      await loginPage.verifyLoginSuccessWithCorporate();
      await manageEmployeesPage.navigateToEmployees();
    });
  });

  test('TC01 - Create a new Employee successfully', async () => {
    await test.step('Click Create Employee', async () => {
      await manageEmployeesPage.create_btn.click();
    });

    await test.step('Fill Employee Details', async () => {
      await createEmployeePage.fillEmployeeDetails({
          firstName: 'Automated',
          secondName: 'Test',
          thirdName: 'User',
          lastName: 'QA'
      });
    });

    await test.step('Save Employee', async () => {
      await createEmployeePage.saveEmployee();
    });
  });

});
