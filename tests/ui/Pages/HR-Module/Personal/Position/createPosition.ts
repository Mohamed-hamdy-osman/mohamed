import { expect, type Locator, type Page, test } from '@playwright/test';

export class CreatePositionPage {

  readonly page: Page;

  readonly positionName_textbox: Locator;
  readonly department_dropdown: Locator;
  readonly job_dropdown: Locator;
  readonly costCenter_dropdown: Locator;
  readonly requirement_textbox: Locator;
  readonly mandatory_checkbox: Locator;
  readonly addRequirement_btn: Locator;
  readonly status_toggle: Locator;
  readonly save_btn: Locator;

  constructor(page: Page) {

    this.page = page;

    // Scoped locators with the newly identified mandatory fields
    // Dynamic locators to handle varying numbers of fields
    this.positionName_textbox = page.locator('div[role="dialog"] input').first();
    // Using a more robust way to find dropdowns within the dialog
    const dropdowns = page.locator('div[role="dialog"] .p-dropdown, div[role="dialog"] [role="combobox"]');
    this.department_dropdown = dropdowns.nth(0);
    this.job_dropdown = dropdowns.nth(1);
    this.costCenter_dropdown = dropdowns.nth(2);
    
    // Requirement section - Extremely robust locators
    this.requirement_textbox = page.locator('div[role="dialog"]').locator('input[placeholder*="Requirement"], textarea[placeholder*="Requirement"], .p-inputtext').last();
    this.mandatory_checkbox = page.locator('div[role="dialog"]').locator('.p-checkbox, [role="checkbox"]').filter({ hasText: /Mandatory/i }).or(page.locator('div[role="dialog"] .p-checkbox-box')).first();
    this.addRequirement_btn = page.locator('div[role="dialog"]').locator('button').filter({ has: page.locator('.pi-plus') }).or(page.locator('div[role="dialog"] button:has-text("Add")')).first();
    this.status_toggle = page.locator('div[role="dialog"]').getByRole('switch'); 
    this.save_btn = page.locator('div[role="dialog"]').getByRole('button', { name: 'Save' });

  }

  async fillPositionDetails(name: string, departmentIndex: number = 1, jobIndex: number = 1, costCenterIndex: number = 1, isActive: boolean = true, requirementName: string = 'Technical Qualification') {
    await test.step(`Filling Position Details: ${name}, Dept Index: ${departmentIndex}, Job Index: ${jobIndex}, Cost Center Index: ${costCenterIndex}, Active: ${isActive}`, async () => {
      await this.positionName_textbox.fill(name);
      
      // Select Department
      await this.department_dropdown.click();
      let panel = this.page.locator('.p-dropdown-panel, .p-dropdown-items-wrapper, .p-overlay').last();
      await panel.waitFor({ state: 'visible' });
      const departmentItem = panel.locator('li').filter({ hasText: /\w/ }).nth(departmentIndex === 1 ? 0 : departmentIndex);
      await departmentItem.waitFor({ state: 'visible' });
      await departmentItem.click();

      // Select Job
      await this.job_dropdown.click();
      panel = this.page.locator('.p-dropdown-panel, .p-dropdown-items-wrapper, .p-overlay').last();
      await panel.waitFor({ state: 'visible' });
      const jobItem = panel.locator('li').filter({ hasText: /\w/ }).nth(jobIndex === 1 ? 0 : jobIndex);
      await jobItem.waitFor({ state: 'visible' });
      await jobItem.click();

      // Select Cost Center (Only if visible, as Job might be the only other dropdown)
      if (await this.costCenter_dropdown.isVisible()) {
        await this.costCenter_dropdown.click();
        panel = this.page.locator('.p-dropdown-panel, .p-dropdown-items-wrapper, .p-overlay').last();
        await panel.waitFor({ state: 'visible' });
        const costCenterItem = panel.locator('li').filter({ hasText: /\w/ }).nth(costCenterIndex === 1 ? 0 : costCenterIndex);
        await costCenterItem.waitFor({ state: 'visible' });
        await costCenterItem.click();
      }

      // Fill Requirement
      await test.step('Filling Requirement Section', async () => {
          await this.requirement_textbox.waitFor({ state: 'visible' });
          await this.requirement_textbox.fill(requirementName);
          await this.mandatory_checkbox.click({ force: true });
          
          // Click Add button and also press Enter as fallback
          await this.addRequirement_btn.click();
          await this.requirement_textbox.press('Enter');
          await this.page.waitForTimeout(1000); // Wait for list to update
      });

      // Handle Toggle
      const isChecked = await this.status_toggle.getAttribute('aria-checked');
      if ((isActive && isChecked === 'false') || (!isActive && isChecked === 'true')) {
        await this.status_toggle.click();
      }
    });
  }

  async savePosition(expectedName: string) {
    await test.step(`Saving and verifying position: ${expectedName}`, async () => {
      await expect(this.save_btn).toBeEnabled();
      await this.save_btn.click();
      
      // Check for dialog hiding
      const dialog = this.page.getByRole('dialog', { name: /position/i });
      await expect(dialog).toBeHidden({ timeout: 15000 });
    });
  }

  async savePositionWithResponse(expectedName: string) {
    await test.step(`Saving position and verifying backend response for: ${expectedName}`, async () => {
      await expect(this.save_btn).toBeEnabled();

      const responsePromise = this.page.waitForResponse(
        response => response.url().includes('add-edit') && response.status() === 200,
        { timeout: 15000 }
      );

      await this.save_btn.click();

      const response = await responsePromise;
      const responseBody = await response.json();
      console.log('Backend Response:', JSON.stringify(responseBody, null, 2));
    });
  }

}
