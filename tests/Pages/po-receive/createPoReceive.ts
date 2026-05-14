import { expect, type Locator, type Page } from '@playwright/test';

export class CreatePOReceivePage {

  readonly page: Page;

  readonly create_btn: Locator;
  readonly inventoryItem_btn: Locator;
  readonly next_btn: Locator;
  readonly firstRadio_btn: Locator;
  readonly selectAll_checkbox: Locator;
  readonly receivedQty_inputs: Locator;
  readonly createPOReceive_btn: Locator;
  readonly save_btn: Locator;

  constructor(page: Page) {

    this.page = page;

    this.create_btn = page.getByRole(
      'button',
      { name: 'Create' }
    );

    this.inventoryItem_btn = page
      .getByRole(
        'button',
        {
          name: 'Inventory Item',
          exact: true
        }
      )
      .first();

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

    this.receivedQty_inputs = page.locator(
      'input[placeholder="Enter Received QTY"]'
    );

    this.createPOReceive_btn = page.getByRole(
      'button',
      { name: 'Create Po Receive' }
    );

    this.save_btn = page
      .locator('#kt_app_content_container')
      .getByRole('button', {
        name: 'Save'
      });

  }

  async waitForLoader() {

    await this.page
      .locator('.loader-wrapper')
      .waitFor({
        state: 'hidden',
        timeout: 30000
      });

  }

  async startCreatePOReceive() {

    await this.waitForLoader();

    await expect(
      this.create_btn
    ).toBeVisible();

    await this.create_btn.click();

    await expect(
      this.inventoryItem_btn
    ).toBeVisible();

    await this.inventoryItem_btn.click();

  }

  async selectFirstPO() {

    await this.waitForLoader();

    await expect(
      this.firstRadio_btn
    ).toBeVisible({
      timeout: 15000
    });

    await this.firstRadio_btn.check();

    await expect(
      this.next_btn
    ).toBeEnabled();

    await this.next_btn.click();

  }

  async selectLinesAndFillQty() {

    await this.waitForLoader();

    await expect(
      this.page.getByText(
        'Select Receive Lines'
      )
    ).toBeVisible({
      timeout: 15000
    });

    await this.selectAll_checkbox.check();

    await expect(
      this.page.getByText(
        'Selected Receive Lines'
      )
    ).toBeVisible({
      timeout: 15000
    });

    await expect(
      this.receivedQty_inputs.first()
    ).toBeVisible({
      timeout: 15000
    });

    await expect(
      this.receivedQty_inputs
    ).toHaveCount(2);

    // first line = 5
    await this.receivedQty_inputs
      .nth(0)
      .fill('5');

    await expect(
      this.receivedQty_inputs.nth(0)
    ).toHaveValue('5');

    // second line = 10
    await this.receivedQty_inputs
      .nth(1)
      .fill('10');

    await expect(
      this.receivedQty_inputs.nth(1)
    ).toHaveValue('10');

    await expect(
      this.createPOReceive_btn
    ).toBeEnabled({
      timeout: 15000
    });

    await this.createPOReceive_btn.click();

  }

  async editReceivedLine() {

    await this.waitForLoader();

    // click edit on second line
    const edit_btn = this.page
      .locator('i.pi.pi-pencil')
      .nth(1);

    await expect(
      edit_btn
    ).toBeVisible({
      timeout: 15000
    });

    await edit_btn.click();

    const popup = this.page
      .getByLabel('Edit Line');

    await expect(
      popup
    ).toBeVisible({
      timeout: 15000
    });

    // =========================
    // store
    // =========================

    const store_dropdown = popup
      .locator('.p-select-dropdown')
      .first();

    await store_dropdown.click();

    await this.page
      .locator('.p-select-option')
      .first()
      .click();

    // =========================
    // quantity = 10
    // =========================

    const quantity_input = popup
      .locator('input.p-inputtext')
      .first();

    await expect(
      quantity_input
    ).toBeVisible({
      timeout: 15000
    });

    await quantity_input.fill('10');

    await expect(
      quantity_input
    ).toHaveValue('10');

    // =========================
    // locator
    // =========================

    const locator_dropdown = popup
      .locator('.p-select-dropdown')
      .nth(1);

    await locator_dropdown.click();

    await this.page
      .locator('.p-select-option')
      .first()
      .click();

    // =========================
    // popup save
    // =========================

    const popupSave_btn = popup
      .getByRole('button', {
        name: 'Save'
      });

    await expect(
      popupSave_btn
    ).toBeEnabled({
      timeout: 15000
    });

    await popupSave_btn.click();

  }

  async savePOReceive() {

    await this.waitForLoader();

    await expect(
      this.save_btn
    ).toBeEnabled({
      timeout: 15000
    });

    await this.save_btn.click();

    // confirm redirect
    await expect(
      this.page
    ).toHaveURL(
      /po-receive/,
      {
        timeout: 15000
      }
    );

    // confirm listing page loaded
    await expect(
      this.create_btn
    ).toBeVisible({
      timeout: 15000
    });

  }

}