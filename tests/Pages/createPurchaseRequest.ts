import { expect, type Locator, type Page } from '@playwright/test';

export class CreatePurchaseRequestPage {

  readonly page: Page;

  readonly branch_dropdown: Locator;
  readonly requester_dropdown: Locator;
  readonly financialPeriod_dropdown: Locator;

  readonly addLine_btn: Locator;

  readonly type_dropdown: Locator;
  readonly group_dropdown: Locator;
  readonly subGroup_dropdown: Locator;
  readonly item_dropdown: Locator;
  readonly uom_dropdown: Locator;

  readonly quantity_textbox: Locator;
  readonly unitPrice_textbox: Locator;

  readonly saveLine_btn: Locator;
  readonly submit_btn: Locator;

  constructor(page: Page) {

    this.page = page;

    // Header dropdowns
    this.branch_dropdown = page.getByRole('combobox').nth(0);
    this.requester_dropdown = page.getByRole('combobox').nth(1);
    this.financialPeriod_dropdown = page.getByRole('combobox').nth(2);

    this.addLine_btn = page.getByRole('button', { name: 'Add Line' });

    // Line dropdowns
    this.type_dropdown = page.getByRole('combobox').nth(3);
    this.group_dropdown = page.getByRole('combobox').nth(4);
    this.subGroup_dropdown = page.getByRole('combobox').nth(5);
    this.item_dropdown = page.getByRole('combobox').nth(6);
    this.uom_dropdown = page.getByRole('combobox').nth(7);

    // Inputs داخل الـ modal
    this.quantity_textbox = page.getByPlaceholder('Enter Quantity');
    this.unitPrice_textbox = page.getByPlaceholder('Enter Unit Price');

    this.saveLine_btn = page.getByRole('button', { name: 'Save', exact: true });

    // زر Submit النهائي
    this.submit_btn = page.getByRole('button', { name: 'Submit', exact: true });

  }

  async selectOption(dropdown: Locator, index: number) {

    await dropdown.click();

    const panel = this.page.locator('.p-overlay:visible').first();

    await panel.waitFor({ state: 'visible' });

    await panel.locator('.p-select-option').nth(index).click();

  }

  async fillRequiredFields() {

    await this.selectOption(this.branch_dropdown, 0);

    await this.selectOption(this.requester_dropdown, 0);

    await this.selectOption(this.financialPeriod_dropdown, 0);

  }

  async addPurchaseLine() {

    await expect(this.addLine_btn).toBeEnabled();

    await this.addLine_btn.click();

    await this.quantity_textbox.waitFor({ state: 'visible' });

  }

  async fillPurchaseLine() {

    await this.selectOption(this.type_dropdown, 0);

    await this.selectOption(this.group_dropdown, 2);

    await this.selectOption(this.subGroup_dropdown, 0);

    await this.selectOption(this.item_dropdown, 0);

    await this.selectOption(this.uom_dropdown, 0);

    await this.quantity_textbox.fill('20');

    await this.unitPrice_textbox.fill('20');

  }

  async saveLine() {

    await expect(this.saveLine_btn).toBeEnabled();

    await this.saveLine_btn.click();

  }

  async submitPurchaseRequest() {

    // انتظار اختفاء loader
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });

    await expect(this.submit_btn).toBeEnabled();

    await this.submit_btn.click();

  }

}