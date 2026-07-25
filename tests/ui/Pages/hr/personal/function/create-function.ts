import { expect, type Locator, type Page, test } from '@playwright/test';

export class CreateFunctionPage {

  readonly page: Page;

  readonly costCenter_dropdown: Locator;
  readonly status_toggle: Locator;
  readonly save_btn: Locator;
  department_dropdown: Locator;
  functionName_textbox: Locator;

  constructor(page: Page) {

    this.page = page;

    // Scoped locators to the dialog to avoid matching background table filters
    this.functionName_textbox = page.locator('div.p-dialog input.p-inputtext').first();
    this.department_dropdown = page.locator('div.p-dialog').getByRole('combobox').nth(0);
    this.costCenter_dropdown = page.locator('div.p-dialog').getByRole('combobox').nth(1);
    this.status_toggle = page.locator('div.p-dialog').getByRole('switch'); 
    this.save_btn = page.locator('div.p-dialog').getByRole('button', { name: 'Save' });

  }

  async fillFunctionDetails(name: string, departmentIndex: number = 1, costCenterIndex: number = 1, isActive: boolean = true) {
    await test.step(`Filling Function Details: ${name}, Dept Index: ${departmentIndex}, Cost Center Index: ${costCenterIndex}, Active: ${isActive}`, async () => {
      await this.functionName_textbox.fill(name);
      
      // Select Department
      await this.department_dropdown.click();
      let panel = this.page.locator('.p-dropdown-panel, .p-dropdown-items-wrapper, .p-overlay').last();
      await panel.waitFor({ state: 'visible' });
      // Select the first non-empty item (usually index 1 if 0 is a placeholder)
      const departmentItem = panel.locator('li').filter({ hasText: /\w/ }).nth(departmentIndex === 1 ? 0 : departmentIndex);
      await departmentItem.waitFor({ state: 'visible' });
      await departmentItem.click();

      // Select Cost Center
      await this.costCenter_dropdown.click();
      panel = this.page.locator('.p-dropdown-panel, .p-dropdown-items-wrapper, .p-overlay').last();
      await panel.waitFor({ state: 'visible' });
      const costCenterItem = panel.locator('li').filter({ hasText: /\w/ }).nth(costCenterIndex === 1 ? 0 : costCenterIndex);
      await costCenterItem.waitFor({ state: 'visible' });
      await costCenterItem.click();

      // Handle Toggle
      const isChecked = await this.status_toggle.getAttribute('aria-checked');
      
      if ((isActive && isChecked === 'false') || (!isActive && isChecked === 'true')) {
        await this.status_toggle.click();
      }
    });
  }

  async saveFunction(expectedName: string) {
    await test.step(`Saving and verifying function: ${expectedName}`, async () => {
      await expect(this.save_btn).toBeEnabled();
      await this.save_btn.click();
      
      // Optional: Check for dialog hiding (reliable indicator that submission finished)
      const dialog = this.page.getByRole('dialog', { name: /function/i });
      await expect(dialog).toBeHidden({ timeout: 15000 });
    });
  }

  async saveFunctionWithResponse(expectedName: string) {
    await test.step(`Saving function and verifying backend response for: ${expectedName}`, async () => {
      await expect(this.save_btn).toBeEnabled();

      // Set up response listener (assuming same endpoint pattern)
      const responsePromise = this.page.waitForResponse(
        response => response.url().includes('add-edit-function') && response.status() === 200,
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
