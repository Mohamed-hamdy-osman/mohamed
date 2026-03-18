import { expect, type Locator, type Page } from '@playwright/test';

export class CreatePurchaseOrderPage {

  readonly page: Page;

  readonly poVersion_dropdown: Locator;
  readonly branch_dropdown: Locator;
  readonly currency_dropdown: Locator;
  readonly currencyType_dropdown: Locator;
  readonly exchangeRate_input: Locator;
  readonly vendor_dropdown: Locator;

  readonly addLine_btn: Locator;

  readonly quantity_textbox: Locator;
  readonly unitPrice_textbox: Locator;
  readonly submit_btn: Locator;

  constructor(page: Page) {

    this.page = page;

    // Header
    this.poVersion_dropdown = page.getByRole('combobox').nth(0);
    this.branch_dropdown = page.getByRole('combobox').nth(1);
    this.currency_dropdown = page.getByRole('combobox').nth(2);
    this.currencyType_dropdown = page.getByRole('combobox').nth(3);

    this.exchangeRate_input = page.locator('input[placeholder="Select Exchange Rate"]');

    this.vendor_dropdown = page.getByRole('combobox').nth(4);

    this.addLine_btn = page.getByRole('button', { name: 'Add Line' });
    this.quantity_textbox = page.getByPlaceholder('Enter Quantity');
    this.unitPrice_textbox = page.getByPlaceholder('Enter Unit Price');
    this.submit_btn = page.getByRole('button', { name: 'Submit', exact: true });
  }

  async selectOption(dropdown: Locator, index?: number) {

    const safeIndex = index ?? 0;

    // انتظار اختفاء اللودر
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });

    await dropdown.waitFor({ state: 'visible' });

    await dropdown.click();

    const options = this.page.locator('.p-select-option');

    await options.first().waitFor({ state: 'visible' });

    await options.nth(safeIndex).click();
  }

  async fillRequiredFields() {

    await this.selectOption(this.poVersion_dropdown, 0);

    await this.selectOption(this.branch_dropdown, 0);

    await this.selectOption(this.currency_dropdown, 0);

    await this.selectOption(this.currencyType_dropdown, 0);

    await this.selectOption(this.vendor_dropdown, 0);

    // انتظار auto fields
    await this.page.waitForTimeout(2000);

    // Financial Period
    await this.page.locator('text=Select Financial Period').click();
    await this.page.locator('.p-select-option').first().click();
  }

  async addPurchaseLine() {

    await expect(this.addLine_btn).toBeEnabled({ timeout: 20000 });

    await this.addLine_btn.click();

    // ✅ انتظار popup الحقيقي
    await this.page.locator('.p-dialog:visible').waitFor({ state: 'visible' });
  }

  async fillPurchaseLine(line: any) {

    const dialog = this.page.locator('.p-dialog:visible');

    const type_dropdown = dialog.getByRole('combobox').nth(0);
    const group_dropdown = dialog.getByRole('combobox').nth(1);
    const subGroup_dropdown = dialog.getByRole('combobox').nth(2);
    const item_dropdown = dialog.getByRole('combobox').nth(3);
    const uom_dropdown = dialog.getByRole('combobox').nth(4);
    const costCenter_dropdown = dialog.getByRole('combobox').nth(5);
    const taxList_dropdown = dialog.getByRole('combobox').nth(6);
    const quantity_textbox = dialog.getByPlaceholder('Enter Quantity');
    const unitPrice_textbox = dialog.getByPlaceholder('Enter Unit Price');

    const saveLine_btn = dialog.getByRole('button', { name: 'Save', exact: true });

    await this.selectOption(type_dropdown, line.typeIndex);

    await this.selectOption(group_dropdown, line.groupIndex);

    await this.selectOption(subGroup_dropdown, line.subGroupIndex);

    await this.selectOption(item_dropdown, line.itemIndex);

    await this.selectOption(uom_dropdown, line.uomIndex);

    await this.selectOption(costCenter_dropdown, 0);

    await quantity_textbox.fill(line.quantity);

    await unitPrice_textbox.fill(line.price);

    await expect(saveLine_btn).toBeEnabled();

    await saveLine_btn.click();

    // انتظار غلق popup
    await this.page.locator('.p-dialog').waitFor({ state: 'hidden' });
  }

  async addMultiplePurchaseLines(lines: any[]) {

    for (const line of lines) {

      await this.addPurchaseLine();

      await this.fillPurchaseLine(line);
    }
  }

  async submitPurchaseOrder() {

    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });

    await expect(this.submit_btn).toBeVisible();

    await expect(this.submit_btn).toBeEnabled();

    await this.submit_btn.click();

    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });

    await expect(
      this.page.getByText('Purchase Order Submitted Successfully')
    ).toBeVisible({ timeout: 10000 });
  }

}