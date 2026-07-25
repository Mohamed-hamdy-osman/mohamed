import { test } from '@playwright/test';
import { ManageDepartmentsPage } from '../../../../Pages/HR-Module/Personal/Departments/manageDepartments';
import { CreateDepartmentPage } from '../../../../Pages/HR-Module/Personal/Departments/createDepartment';

let manageDepartmentsPage: ManageDepartmentsPage;
let createDepartmentPage: CreateDepartmentPage;

test.describe('Create Department Module', () => {

  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    manageDepartmentsPage = new ManageDepartmentsPage(page);
    createDepartmentPage = new CreateDepartmentPage(page);

      await page.goto('/zeta/choose-module');
  await page.waitForLoadState('networkidle');
      await manageDepartmentsPage.navigateToDepartments();
  });

  test('TC01 - Verify Successful Creation of a New Department', async () => {
    
    await test.step('Click Create Button', async () => {
        await manageDepartmentsPage.create_btn.click();
    });

    await createDepartmentPage.fillDepartmentDetails(
        'Engineering Dept', 
        0
    );

    await createDepartmentPage.saveDepartment('Engineering Dept');

  });

});
