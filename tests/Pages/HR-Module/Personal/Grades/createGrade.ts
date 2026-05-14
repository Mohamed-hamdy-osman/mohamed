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
    this.minSalary_textbox = dialog.getByPlaceholder(/Minimum Salary/i);
    this.maxSalary_textbox = dialog.getByPlaceholder(/Maximum Salary/i);
    this.yearsOfExperience_textbox = dialog.getByPlaceholder(/Years Of Experience/i);
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
      // Select Position
      if (details.positionIndex !== undefined) {
        await this.position_dropdown.click();
        const panel = this.page.locator('.p-dropdown-panel, .p-overlay').last();
        await panel.waitFor({ state: 'visible' });
        await panel.locator('li').nth(details.positionIndex).click();
      }

      await this.code_textbox.fill(details.code);
      await this.title_textbox.fill(details.title);
      await this.minSalary_textbox.fill(details.minSalary);
      await this.maxSalary_textbox.fill(details.maxSalary);
      await this.yearsOfExperience_textbox.fill(details.yearsOfExperience);

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
      await expect(this.save_btn).toBeEnabled();
      await this.save_btn.click();
      
      const dialog = this.page.getByRole('dialog', { name: /grade/i });
      await expect(dialog).toBeHidden({ timeout: 15000 });
    });
  }
}
