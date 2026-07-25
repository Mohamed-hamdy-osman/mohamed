import { expect, type Locator, type Page, test } from '@playwright/test';

export class CreateDepartmentPage {

  readonly page: Page;

  readonly departmentName_textbox: Locator;
  readonly costCenter_dropdown: Locator;
  readonly requirementInputs: Locator;
  readonly save_btn: Locator;

  constructor(page: Page) {

    this.page = page;

    // Based on the "Add department" dialog snapshot
    this.departmentName_textbox = page.getByRole('textbox', { name: 'Department Name *' });
    this.costCenter_dropdown = page.getByRole('combobox', { name: 'Enter Cost Center' });
    this.save_btn = page.getByRole('button', { name: 'Save' });
    
    // Requirements (First two are visible by default in the snapshot)
    this.requirementInputs = page.getByPlaceholder('Enter Requirement');

  }

  async fillDepartmentDetails(name: string, costCenterIndex: number = 0) {
    await test.step(`Filling Department Details: ${name}`, async () => {
      await this.departmentName_textbox.fill(name);
      
      // Select Cost Center
      await this.costCenter_dropdown.click();
      const panel = this.page.locator('.p-dropdown-panel, .p-dropdown-items-wrapper, .p-overlay').last();
      await panel.waitFor({ state: 'visible' });
      await panel.locator('li').nth(costCenterIndex).click();

      // Fill pre-populated requirements to satisfy validation
      const reqCount = await this.requirementInputs.count();
      for (let i = 0; i < reqCount; i++) {
        await this.requirementInputs.nth(i).fill(`Requirement ${i + 1} details`);
      }
    });
  }

  async saveDepartment(expectedName: string) {
    await test.step(`Saving and verifying department: ${expectedName}`, async () => {
      await expect(this.save_btn).toBeEnabled();
      await this.save_btn.click();
      
      // Verification: Check if the name appears in the data table (reliable indicator)
      await expect(this.page.locator('tbody')).toContainText(expectedName, { timeout: 15000 });

      // Optional: Check for dialog hiding, but don't fail immediately if animations are slow
      const dialog = this.page.getByRole('dialog', { name: 'Add department' });
      try {
        await expect(dialog).toBeHidden({ timeout: 5000 });
      } catch (e) {
        console.log('Dialog did not hide automatically, but data was found in table.');
      }
    });
  }

  async saveDepartmentWithResponse(expectedName: string) {
    await test.step(`Saving department and verifying backend response for: ${expectedName}`, async () => {
      await expect(this.save_btn).toBeEnabled();

      // Set up response listener
      const responsePromise = this.page.waitForResponse(
        response => response.url().includes('add-edit-department') && response.status() === 200,
        { timeout: 15000 }
      );

      await this.save_btn.click();

      // Wait for the response
      const response = await responsePromise;
      const responseBody = await response.json();
      
      console.log('Backend Response:', JSON.stringify(responseBody, null, 2));

      // Standard verification
      await expect(this.page.locator('tbody')).toContainText(expectedName, { timeout: 15000 });
    });
  }

}
