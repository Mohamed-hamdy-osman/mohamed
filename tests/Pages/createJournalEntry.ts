import { type Locator, type Page } from '@playwright/test';

export class CreateJournalEntryPage {

  readonly page: Page;

  readonly journalName_textbox: Locator;
  readonly journalDate_input: Locator;
  readonly category_dropdown: Locator;
  readonly addLine_btn: Locator;

  constructor(page: Page) {

    this.page = page;

    // ✅ Journal Name
    this.journalName_textbox = page
      .locator('input[placeholder="Journal Name"]')
      .first();

    // ✅ Journal Date
    this.journalDate_input = page
      .locator('input[placeholder="Journal Date"]')
      .first();

    // ✅ Category
    this.category_dropdown = page.getByRole('combobox', { name: 'Category' });

    // ✅ Add Line
    this.addLine_btn = page.getByRole('button', { name: 'Add Line' });
  }

  // =========================
  // ✅ Journal Name
  // =========================
  async enterJournalName() {
    await this.journalName_textbox.fill('auto test');
  }

  // =========================
  // ✅ Category (Keyboard)
  // =========================
  async selectFirstCategory() {

    const dropdown = this.category_dropdown;

    await dropdown.waitFor({ state: 'visible' });

    await dropdown.focus();

    await this.page.keyboard.press('Enter');
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
  }

  // =========================
  // ✅ Date (Fixed 🔥)
  // =========================
  async selectTodayDate() {

    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    await this.journalDate_input.fill(formattedDate);

    // 💥 مهم: اقفل الـ datepicker
    await this.page.keyboard.press('Escape');
  }

  // =========================
  // ✅ Add Line (Fixed 🔥)
  // =========================
  async clickAddLine() {

    await this.addLine_btn.scrollIntoViewIfNeeded();

    await this.addLine_btn.click({ force: true });
  }
}