import { type Locator, type Page } from '@playwright/test';

export class CreateJournalEntryPage {

  readonly page: Page;

  readonly journalName_textbox: Locator;
  readonly journalDate_input: Locator;
  readonly category_dropdown: Locator;
  readonly addLine_btn: Locator;
  readonly save_btn: Locator;

  constructor(page: Page) {

    this.page = page;

    // ✅ Header (Indexed)
    this.journalName_textbox = page.locator('input[placeholder="Journal Name"]').nth(0);

    this.journalDate_input = page.locator('input[placeholder="Journal Date"]').nth(0);

    this.category_dropdown = page.getByRole('combobox', { name: 'Category' }).nth(0);

    // ✅ Actions
    this.addLine_btn = page.getByRole('button', { name: 'Add Line' }).nth(0);

    this.save_btn = page.getByRole('button', { name: 'Save' }).nth(0);
  }

  // =========================
  // ✅ Journal Name
  // =========================
  async enterJournalName() {
    await this.journalName_textbox.fill('auto test');
  }

  // =========================
  // ✅ Category (Keyboard Stable)
  // =========================
  async selectFirstCategory() {

    const dropdown = this.category_dropdown;

    await dropdown.waitFor({ state: 'visible' });

    await dropdown.focus();

    await this.page.keyboard.press('Enter');
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');

    await dropdown.press('Tab'); // 🔥 مهم
  }

  // =========================
  // ✅ Date
  // =========================
  async selectTodayDate() {

    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    await this.journalDate_input.fill(formattedDate);

    await this.journalDate_input.press('Tab'); // 🔥 مهم
  }

  // =========================
  // ✅ Add Line
  // =========================
  async clickAddLine() {
    await this.addLine_btn.click({ force: true });
  }

  // =========================
  // ✅ Select Account (Indexed)
  // =========================
  async selectAccountByIndex(index: number) {

    const row = this.page.locator('table tbody tr').nth(index);

    await row.locator('text=Select Account').click();

    const dialog = this.page.locator('.p-dialog:visible');

    await dialog.waitFor();

    await dialog.locator('input[type="radio"]').nth(0).click({ force: true });

    await dialog.waitFor({ state: 'hidden' });
  }

  // =========================
  // ✅ Debit (FIXED 🔥)
  // =========================
  async enterDebitByIndex(index: number, value: string) {

    const row = this.page.locator('table tbody tr').nth(index);

    const debit = row.locator('input[placeholder="Enter Debit Value"]');

    await debit.waitFor({ state: 'visible' });

    await debit.click();

    await debit.fill(value);
  }

  // =========================
  // ✅ Credit (FIXED 🔥)
  // =========================
  async enterCreditByIndex(index: number, value: string) {

    const row = this.page.locator('table tbody tr').nth(index);

    const credit = row.locator('input[placeholder="Enter Credit Value"]');

    await credit.waitFor({ state: 'visible' });

    await credit.click();

    await credit.fill(value);
  }

  // =========================
  // ✅ Save
  // =========================
  async saveJournalEntry() {
    await this.save_btn.click();
  }
}