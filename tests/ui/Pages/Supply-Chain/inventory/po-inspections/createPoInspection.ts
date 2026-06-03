import { expect, type Locator, type Page } from '@playwright/test';

export class CreatePOInspectionPage {

  readonly page: Page;

  readonly create_btn: Locator;
  readonly next_btn: Locator;
  readonly firstRadio_btn: Locator;
  readonly selectAll_checkbox: Locator;

  readonly approvedQty_inputs: Locator;

  readonly createPOInspection_btn: Locator;
  readonly save_btn: Locator;

  constructor(page: Page) {

    this.page = page;

    this.create_btn = page.getByRole(
      'button',
      { name: 'Create' }
    );

    this.firstRadio_btn = page
      .locator('input[type="radio"]')
      .first();

    this.next_btn = page.getByRole(
      'button',
      {
        name: 'Next',
        exact: true
      }
    );

    this.selectAll_checkbox = page
      .locator('input[type="checkbox"]')
      .first();

    this.approvedQty_inputs = page.locator(
      'input[placeholder="Enter Approved Qty"]'
    );

    this.createPOInspection_btn = page.getByRole(
      'button',
      { name: 'Create Po Inspection' }
    );

    this.save_btn = page.getByRole(
      'button',
      { name: 'Save' }
    );
  }

  async waitForLoader() {

    await this.page
      .locator('.loader-wrapper')
      .waitFor({ state: 'hidden' });

  }

  async startCreatePOInspection() {

    await this.waitForLoader();

    await expect(
      this.create_btn
    ).toBeVisible();

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

    const approvedQty_input = this.page.locator(
      'input[placeholder="Enter Approved Qty"]'
    );

    await approvedQty_input
      .first()
      .waitFor({ state: 'visible' });

    await approvedQty_input
      .first()
      .click();

    await approvedQty_input
      .first()
      .fill('10');

    // مهم جداً عشان السيستم يعمل validation
    await approvedQty_input
      .first()
      .press('Enter');

    await approvedQty_input
      .first()
      .press('Tab');

    // click خارج ال input
    await this.page.mouse.click(50, 50);

    await this.page.waitForTimeout(2000);

    await this.createPOInspection_btn
      .scrollIntoViewIfNeeded();

    await expect(
      this.createPOInspection_btn
    ).toBeEnabled({ timeout: 15000 });

    await this.createPOInspection_btn.click();

  }

  async savePOInspection() {

    await this.waitForLoader();

    await expect(
      this.save_btn
    ).toBeEnabled();

    await this.save_btn.click();

    // تأكيد إن اليوزر ضغط Save فعلاً
    await expect(this.page).toHaveURL(
      /po-inspection/,
      {
        timeout: 15000
      }
    );

    // تأكيد إننا رجعنا للـ listing page
    await expect(
      this.create_btn
    ).toBeVisible({
      timeout: 15000
    });

  }

}