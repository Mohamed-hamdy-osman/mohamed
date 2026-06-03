import { expect, type Locator, type Page, test } from '@playwright/test';

export class CreateGradePage {

  readonly page: Page;

  readonly position_dropdown: Locator;
  readonly code_textbox: Locator;
  readonly title_textbox: Locator;
  readonly minSalary_textbox: Locator;
  readonly maxSalary_textbox: Locator;
  readonly yearsOfExperience_textbox: Locator;
  readonly titleScope_textbox: Locator;
  readonly status_toggle: Locator;
  readonly addResponsibility_btn: Locator;
  readonly selectComponent_dropdown: Locator;
  readonly save_btn: Locator;

  constructor(page: Page) {
    this.page = page;

    const dialog = page.locator('div[role="dialog"]');
    this.position_dropdown = dialog.getByRole('combobox').first();
    this.code_textbox = dialog.getByPlaceholder(/Code/i);
    this.title_textbox = dialog.getByPlaceholder(/Title/i).first();
    this.minSalary_textbox = dialog.locator('input[placeholder*="Minimum Salary"], input[aria-label*="Minimum Salary"]');
    this.maxSalary_textbox = dialog.locator('input[placeholder*="Maximum Salary"], input[aria-label*="Maximum Salary"]');
    this.yearsOfExperience_textbox = dialog.locator('input[placeholder*="Years Of Experience"], input[aria-label*="Years Of Experience"]');
    this.titleScope_textbox = dialog.getByPlaceholder(/Title Scope/i);
    this.status_toggle = dialog.getByRole('switch');
    this.addResponsibility_btn = dialog.getByRole('button', { name: /Add Responsibility/i });
    this.selectComponent_dropdown = dialog.getByRole('combobox').last();
    this.save_btn = dialog.getByRole('button', { name: 'Save' });
  }

  async fillGradeDetails(details: {
    positionIndex?: number,
    code: string,
    title: string,
    minSalary: string,
    maxSalary: string,
    yearsOfExperience: string,
    titleScope?: string,
    isActive?: boolean
  }) {
    await test.step(`Filling Grade Details: ${details.title}`, async () => {
      
      // 1. Delete the first component row
      await test.step('Delete first benefit component', async () => {
        const deleteBenefitBtns = this.page.locator('button').filter({ hasText: '' });
        if (await deleteBenefitBtns.count() > 0) {
          await deleteBenefitBtns.first().click();
          await this.page.waitForTimeout(500);
        }
      });

      // 2. Select Position using keyboard for better state triggering
      await this.position_dropdown.click();
      await this.page.keyboard.press('ArrowDown');
      await this.page.waitForTimeout(200);
      await this.page.keyboard.press('Enter');
      // Wait for selection to be registered
      await expect(this.position_dropdown).not.toHaveText(/Select Position/i, { timeout: 5000 });
      await this.page.waitForTimeout(500);

      // 2. Select first choice in the remaining component dropdown
      await test.step('Select from remaining component dropdown', async () => {
        const componentDropdowns = this.page.locator('.p-dropdown, [role="combobox"]').filter({ hasText: /Select Component/i });
        
        if (await componentDropdowns.count() > 0) {
          const targetDropdown = componentDropdowns.first();
          await targetDropdown.click();
          await this.page.waitForTimeout(1000);

          const benefitPanel = this.page.locator('.p-dropdown-panel, .p-overlay').last();
          await benefitPanel.waitFor({ state: 'visible' });

          const items = benefitPanel.locator('li.p-dropdown-item');
          const benefitCount = await items.count();
          
          if (benefitCount === 0) {
            throw new Error('the component must be defined first');
          } else {
            await items.nth(0).click();
            await this.page.waitForTimeout(500);
          }
        }
      });

      // 3. Fill text fields using sequential typing
      await this.code_textbox.click();
      await this.page.keyboard.press('Control+A');
      await this.page.keyboard.press('Backspace');
      await this.page.keyboard.type(details.code, { delay: 50 });
      
      await this.page.keyboard.press('Tab');
      await this.page.keyboard.type(details.title, { delay: 50 });
      
      // 4. Fill Salaries & Experience
      await this.page.keyboard.press('Tab');
      await this.page.keyboard.type(details.minSalary, { delay: 50 });
      
      await this.page.keyboard.press('Tab');
      await this.page.keyboard.type(details.maxSalary, { delay: 50 });
      
      await this.page.keyboard.press('Tab');
      await this.page.keyboard.type(details.yearsOfExperience, { delay: 50 });

      // Add one Responsibility (often mandatory for Grade validation)
      await test.step('Add Responsibility', async () => {
        await this.addResponsibility_btn.click();
        const responsibilityInput = this.page.getByPlaceholder(/Enter Responsibilities/i).last();
        await responsibilityInput.waitFor({ state: 'visible' });
        await responsibilityInput.fill('Automated Grade Management');
      });

      if (details.titleScope) {
        await this.titleScope_textbox.fill(details.titleScope);
      }

      // Handle Toggle
      const isChecked = await this.status_toggle.getAttribute('aria-checked');
      const shouldBeActive = details.isActive ?? true;
      if ((shouldBeActive && isChecked === 'false') || (!shouldBeActive && isChecked === 'true')) {
        await this.status_toggle.click();
      }
    });
  }

  async saveGrade(expectedTitle: string) {
    await test.step(`Saving and verifying grade: ${expectedTitle}`, async () => {
      // Small wait to allow validation to settle
      await this.page.waitForTimeout(1000);
      
      const isEnabled = await this.save_btn.isEnabled();
      if (!isEnabled) {
          // Final attempt: Click another field to trigger blur
          await this.title_textbox.click();
          await this.page.waitForTimeout(500);
      }

      await expect(this.save_btn).toBeEnabled({ timeout: 10000 });
      await this.save_btn.click();
      
      const dialog = this.page.getByRole('dialog', { name: /grade/i });
      await expect(dialog).toBeHidden({ timeout: 15000 });
    });
  }
}
