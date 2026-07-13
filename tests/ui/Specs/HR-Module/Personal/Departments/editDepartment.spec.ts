import { test } from '@playwright/test';
import { ManageDepartmentsPage } from '../../../../Pages/HR-Module/Personal/Departments/manageDepartments';
import { CreateDepartmentPage } from '../../../../Pages/HR-Module/Personal/Departments/createDepartment';

let manageDepartmentsPage: ManageDepartmentsPage;
let createDepartmentPage: CreateDepartmentPage;

test.describe('Edit Department Module', () => {

  test.setTimeout(180000); // 3 minutes

  test.beforeEach(async ({ page }) => {
    manageDepartmentsPage = new ManageDepartmentsPage(page);
    createDepartmentPage = new CreateDepartmentPage(page);

      await page.goto('/zeta/choose-module');
  await page.waitForLoadState('networkidle');
      // Using index 0 (V Cola Z) which contains data
      await manageDepartmentsPage.navigateToDepartments();
  });

  test('TC01 - Create then Edit Department and Check Backend Response', async () => {
    
    const timestamp = new Date().getTime();
    const deptName = `AutoDept_${timestamp}`;
    const updatedDeptName = `${deptName}_Updated`;

    await test.step('Create Department First', async () => {
        await manageDepartmentsPage.create_btn.click();
        await createDepartmentPage.fillDepartmentDetails(deptName, 0);
        await createDepartmentPage.saveDepartment(deptName);
    });

    await test.step('Search for the Created Department', async () => {
        await manageDepartmentsPage.searchDepartment(deptName);
        await manageDepartmentsPage.verifySearchResult();
    });

    await test.step('Click Edit Button', async () => {
        await manageDepartmentsPage.edit_btn.first().click();
    });

    await test.step('Update Department Details', async () => {
        await createDepartmentPage.departmentName_textbox.clear();
        await createDepartmentPage.departmentName_textbox.fill(updatedDeptName);
    });

    // This method checks for response code 200 and logs the JSON body
    await createDepartmentPage.saveDepartmentWithResponse(updatedDeptName);

  });

});
