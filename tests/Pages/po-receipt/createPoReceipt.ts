import { expect, type Locator, type Page } from '@playwright/test';

export class CreatePOReceiptPage {
  readonly page: Page;
  readonly create_btn: Locator;
  readonly next_btn: Locator;
  readonly firstRadio_btn: Locator;
  readonly selectAll_checkbox: Locator;
  readonly receiptQty_inputs: Locator;
  readonly createPOReceipt_btn: Locator;
  readonly save_btn: Locator;

  constructor(page: Page) {

    this.page = page;
    this.create_btn = page.getByRole('button', { name: 'Create' });
    this.firstRadio_btn = page.locator('input[type="radio"]').first();
this.next_btn = page.getByRole('button', {
  name: 'Next',
  exact: true
});
    this.selectAll_checkbox = page.locator('input[type="checkbox"]').first();
    this.receiptQty_inputs = page.locator(
      'input[placeholder="Enter Receipt QTY"]'
    );

    this.createPOReceipt_btn = page.getByRole('button', {
      name: 'Create Po Receipt'
    });

    this.save_btn = page.getByRole('button', { name: 'Save' });
  }

  async waitForLoader() {

    await this.page
      .locator('.loader-wrapper')
      .waitFor({ state: 'hidden' });

  }

  
  async startCreatePOReceipt() {
    await this.waitForLoader();
    await expect(this.create_btn).toBeVisible();
    await this.create_btn.click();
  }


  async selectFirstPO() {
    await this.waitForLoader();
    await this.firstRadio_btn.check();
    await this.next_btn.click();
  }

  async selectLinesAndFillQty() {
    await this.waitForLoader();
    await this.selectAll_checkbox.check();
    await this.receiptQty_inputs.nth(0).fill('5');
    await this.receiptQty_inputs.nth(1).fill('10');
    await this.createPOReceipt_btn.click();

  }


  async savePOReceipt() {
    await this.waitForLoader();
    await expect(this.save_btn).toBeEnabled();
    await this.save_btn.click();
  }

}