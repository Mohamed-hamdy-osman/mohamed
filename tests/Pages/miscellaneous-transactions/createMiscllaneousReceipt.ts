import { expect, type Locator, type Page } from '@playwright/test';

export class CreateMiscellaneousReceiptPage {

  readonly page: Page;

  readonly branch_dropdown: Locator;
  readonly transactionType_dropdown: Locator;
  readonly transactionDate_input: Locator;

  readonly addLine_btn: Locator;

  readonly group_dropdown: Locator;
  readonly subGroup_dropdown: Locator;
  readonly itemName_dropdown: Locator;
  readonly uom_dropdown: Locator;

  readonly quantity_textbox: Locator;

  readonly store_dropdown: Locator;
  readonly account_dropdown: Locator;
  readonly costCenter_dropdown: Locator;

  readonly saveLine_btn: Locator;
  readonly save_btn: Locator;

  constructor(page: Page) {

    this.page = page;

    this.branch_dropdown =
      page.getByRole('combobox').nth(0);

    this.transactionType_dropdown =
      page.getByRole('combobox').nth(2);

    this.transactionDate_input =
      page.locator(
        'input[placeholder="transaction Date"]'
      );

    this.addLine_btn = page.getByRole('button', {
      name: 'Add Line'
    });

    this.save_btn = page.getByRole('button', {
      name: 'Save',
      exact: true
    });

    this.group_dropdown =
      page.getByRole('combobox').nth(3);

    this.subGroup_dropdown =
      page.getByRole('combobox').nth(4);

    this.itemName_dropdown =
      page.getByRole('combobox').nth(5);

    this.uom_dropdown =
      page.getByRole('combobox').nth(6);

    this.store_dropdown =
      page.getByRole('combobox').nth(7);

    this.account_dropdown =
      page.getByRole('combobox').nth(8);

    this.costCenter_dropdown =
      page.getByRole('combobox').nth(9);

    this.quantity_textbox =
      page.getByPlaceholder('Enter Quantity');

    this.saveLine_btn =
      page.getByRole('button', {
        name: 'Save'
      }).nth(1);

  }

  async waitForLoader() {

    await this.page
      .locator('.loader-wrapper')
      .waitFor({ state: 'hidden' });

  }

  async selectOption(
    dropdown: Locator,
    index: number
  ) {

    await dropdown.click();

    const panel =
      this.page.locator('.p-overlay:visible').last();

    await panel.waitFor({
      state: 'visible'
    });

    const options =
      panel.locator('.p-select-option');

    await options.first().waitFor({
      state: 'visible'
    });

    await options.nth(index).click();

  }

  async selectMiscellaneousReceipt() {

    await this.waitForLoader();

    await this.page.locator(
      'p-button[label="Miscllaneous Receipt"]'
    ).click({
      force: true
    });

  }

  async fillHeaders() {

    await this.selectOption(
      this.branch_dropdown,
      0
    );

    await this.selectOption(
      this.transactionType_dropdown,
      0
    );

    await this.transactionDate_input.click();

    const today =
      new Date().getDate().toString();

    await this.page.locator(
      'td span',
      { hasText: today }
    ).first().click();

    await this.page.mouse.click(700, 300);

    await expect(
      this.addLine_btn
    ).toBeEnabled({
      timeout: 15000
    });

    await this.addLine_btn.waitFor({
      state: 'visible'
    });

    await this.addLine_btn.click({
      force: true
    });

  }

  async addLine() {

    const dialog =
      this.page.locator(
        '.p-dialog-content'
      ).last();

    await dialog.waitFor({
      state: 'visible'
    });

    const group_dropdown =
      dialog.getByRole('combobox').nth(0);

    const subGroup_dropdown =
      dialog.getByRole('combobox').nth(1);

    const itemName_dropdown =
      dialog.getByRole('combobox').nth(2);

    const uom_dropdown =
      dialog.getByRole('combobox').nth(3);

    const store_dropdown =
      dialog.getByRole('combobox').nth(4);

    const account_dropdown =
      dialog.getByRole('combobox').nth(5);

    const costCenter_dropdown =
      dialog.getByRole('combobox').nth(6);

    await group_dropdown.click();

    let panel =
      this.page.locator(
        '.p-overlay:visible'
      ).last();

    await panel.locator(
      '.p-select-option'
    ).nth(1).click();

    await subGroup_dropdown.click();

    panel =
      this.page.locator(
        '.p-overlay:visible'
      ).last();

    await panel.locator(
      '.p-select-option'
    ).nth(0).click();

    await itemName_dropdown.click();

    panel =
      this.page.locator(
        '.p-overlay:visible'
      ).last();

    await panel.locator(
      '.p-select-option'
    ).nth(0).click();

    await uom_dropdown.click();

    panel =
      this.page.locator(
        '.p-overlay:visible'
      ).last();

    await panel.locator(
      '.p-select-option'
    ).nth(0).click();

    await dialog.getByPlaceholder(
      'Enter Quantity'
    ).fill('10');

    await store_dropdown.click();

    panel =
      this.page.locator(
        '.p-overlay:visible'
      ).last();

    await panel.locator(
      '.p-select-option'
    ).nth(0).click();

    await account_dropdown.click();

    panel =
      this.page.locator(
        '.p-overlay:visible'
      ).last();

    await panel.locator(
      '.p-select-option'
    ).nth(0).click();

    await costCenter_dropdown.click();

    panel =
      this.page.locator(
        '.p-overlay:visible'
      ).last();

    await panel.locator(
      '.p-select-option'
    ).nth(0).click();

    const saveLine_btn =
      dialog.getByRole('button', {
        name: 'Save'
      });

    await expect(
      saveLine_btn
    ).toBeEnabled({
      timeout: 15000
    });

    await saveLine_btn.click();
  }

  async saveTransaction() {
    await this.waitForLoader();
    await this.save_btn.click();
  }

}