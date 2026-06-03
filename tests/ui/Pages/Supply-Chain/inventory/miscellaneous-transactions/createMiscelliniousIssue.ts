import { expect, type Locator, type Page } from '@playwright/test';

export class CreateMiscellaneousIssuePage {

  readonly page: Page;
  readonly create_btn: Locator;
  readonly selectTransactionPopup: Locator;
  readonly transactionType_MiscIssue: Locator;
  readonly branch_List: Locator;
  readonly transaction_Type_Name: Locator;
  readonly transaction_Date: Locator;
  readonly add_Line_btn: Locator;
  readonly group_dropdown: Locator;
  readonly subGroup_dropdown: Locator;
  readonly item_dropdown: Locator;
  readonly uom_dropdown: Locator;
  readonly quantity_textbox: Locator;
  readonly store_dropdown: Locator;
  readonly costCenter_dropdown: Locator;
  readonly account_dropdown: Locator;
  readonly saveLine_btn: Locator;
  readonly save_btn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.create_btn = page.getByRole('button', { name: 'Create' });
    this.selectTransactionPopup = page.getByRole('dialog', { name: 'Select Transaction Type' });
    this.transactionType_MiscIssue = this.selectTransactionPopup.getByRole('button', {
      name: 'Miscellaneous Issue'
    });

    this.branch_List = page.getByLabel('Branch').locator('div').first();
    this.transaction_Type_Name = page.locator('input[placeholder="Select Transaction Type Name"]');
    this.transaction_Date = page.locator('input[placeholder="Transaction Date"]');
    this.add_Line_btn = page.getByRole('button', { name: 'Add Line' });
    this.group_dropdown = page.getByRole('combobox').nth(0);
    this.subGroup_dropdown = page.getByRole('combobox').nth(1);
    this.item_dropdown = page.getByRole('combobox').nth(2);
    this.uom_dropdown = page.getByRole('combobox').nth(3);
    this.store_dropdown = page.getByRole('combobox').nth(4);
    this.costCenter_dropdown = page.getByRole('combobox').nth(5);
    this.account_dropdown = page.getByRole('combobox').nth(6);
    this.quantity_textbox = page.locator('input[type="number"]');
    this.saveLine_btn = page.getByRole('button', { name: 'Save Line' });
    this.save_btn = page.getByRole('button', { name: 'Save' });
  }
  async createMiscIssue() {
    await this.create_btn.click();
    await expect(this.selectTransactionPopup).toBeVisible();
    await this.transactionType_MiscIssue.click();
    await this.branch_List.click();
    await this.page.getByRole('option').first().click();
    await this.transaction_Date.fill('');
    const today = new Date().toISOString().split('T')[0];
    await this.transaction_Date.fill(today);
    await this.transaction_Type_Name.click();
    await this.page.getByRole('option').first().click();
    await expect(this.add_Line_btn).toBeEnabled();
    await this.add_Line_btn.click();
    await this.group_dropdown.click();
    await this.page.getByRole('option').first().click();
    await this.subGroup_dropdown.click();
    await this.page.getByRole('option').first().click();
    await this.item_dropdown.click();
    await this.page.getByRole('option').first().click();
    await this.uom_dropdown.click();
    await this.page.getByRole('option').first().click();
    await this.quantity_textbox.fill('1');
    await this.store_dropdown.click();
    await this.page.getByRole('option').first().click();
    await this.costCenter_dropdown.click();
    await this.page.getByRole('option').first().click();
    await this.account_dropdown.click();
    await this.page.getByRole('option').first().click();
    await this.saveLine_btn.click();
    await this.save_btn.click();
  }
}