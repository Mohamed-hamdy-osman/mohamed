import { expect, type Locator, type Page } from '@playwright/test';


export class CreateJournalEntryPage {

  readonly page: Page;

  readonly addJournalEntry_btn: Locator;
  readonly journalName_textbox: Locator;
  readonly journalDate_Calender: Locator;
  readonly category_dropdown: Locator;
  readonly subCategory_dropdown: Locator;
  readonly currency_dropdown: Locator;

  readonly clearAllLines_btn: Locator;
  readonly addLine_btn: Locator;

  readonly selectAccount_popUP: Locator;
  readonly chartOfAccount_radioButton: Locator;

  readonly dR_input: Locator;
  readonly cR_input: Locator;
  readonly description_textbox: Locator;

  readonly cancel_btn: Locator;
  readonly save_btn: Locator;
  readonly post_btn: Locator;
  readonly removeLine_btn: Locator;

  constructor(page: Page) {

    this.page = page;

    this.addJournalEntry_btn = page.getByRole('button', { name: 'Add Journal Entry' });

    this.journalName_textbox = page.getByPlaceholder('Journal Name');
    this.journalDate_Calender = page.getByPlaceholder('Select Date');

    this.category_dropdown = page.getByRole('combobox').nth(0);
    this.subCategory_dropdown = page.getByRole('combobox').nth(1);
    this.currency_dropdown = page.getByRole('combobox').nth(2);

    this.clearAllLines_btn = page.getByRole('button', { name: 'Clear All Lines' });
    this.addLine_btn = page.getByRole('button', { name: 'Add Line' });

    this.selectAccount_popUP = page.locator('.p-dialog:visible');
    this.chartOfAccount_radioButton = this.selectAccount_popUP.getByText('Chart Of Account');

    this.dR_input = page.getByPlaceholder('Debit');
    this.cR_input = page.getByPlaceholder('Credit');
    this.description_textbox = page.getByPlaceholder('Description');

    this.cancel_btn = page.getByRole('button', { name: 'Cancel' });
    this.save_btn = page.getByRole('button', { name: 'Save' });
    this.post_btn = page.getByRole('button', { name: 'Post' });

    this.removeLine_btn = page.getByRole('button', { name: 'Remove Line' });

  }

  // ✅ Loader handler
  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  }

  async selectOption(dropdown: Locator, index: number = 0) {

    await this.waitForLoader();

    await dropdown.click();

    const options = this.page.locator('.p-select-option');

    await options.first().waitFor({ state: 'visible' });

    await options.nth(index).click();
  }

  // ✅ Header
  async fillHeader() {

    await this.journalName_textbox.fill('Automation Journal');

    await this.selectOption(this.category_dropdown, 0);
    await this.selectOption(this.subCategory_dropdown, 0);
    await this.selectOption(this.currency_dropdown, 0);

  }

  // ✅ Add Line
  async addLine() {

    await this.waitForLoader();

    await expect(this.addLine_btn).toBeEnabled();

    await this.addLine_btn.click();

  }

  // ✅ Select Account (Popup)
  async selectAccount() {

    await expect(this.selectAccount_popUP).toBeVisible();

    await this.chartOfAccount_radioButton.click();

  }

  // ✅ Fill Line
  async fillLine({ debit, credit, description }: any) {

    if (debit) {
      await this.dR_input.fill(debit);
    }

    if (credit) {
      await this.cR_input.fill(credit);
    }

    await this.description_textbox.fill(description);

  }

  // ✅ Save
  async saveJournal() {

    await this.waitForLoader();

    await expect(this.save_btn).toBeEnabled();

    await this.save_btn.click();

  }

  // ✅ Post
  async postJournal() {

    await this.waitForLoader();

    await expect(this.post_btn).toBeEnabled();

    await this.post_btn.click();

  }

}