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

  // ✅ NEW — Save as Draft & Save buttons for service line flow
  readonly saveAsDraft_btn: Locator;
  readonly save_btn: Locator;

  constructor(page: Page) {

    this.page = page;

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

    // ✅ NEW
    this.saveAsDraft_btn = page.getByRole('button', { name: 'Save as Draft', exact: true });
    this.save_btn = page.getByRole('button', { name: 'Save', exact: true });
  }


  async selectOption(dropdown: Locator, index?: number) {

    const safeIndex = index ?? 0;

    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 20000 });
    await dropdown.waitFor({ state: 'visible' });
    await dropdown.click();

    const panel = this.page.locator('.p-select-overlay').last();
    await panel.waitFor({ state: 'visible' });
    const options = panel.locator('.p-select-option');
    await options.nth(safeIndex).waitFor({ state: 'visible' });
    await options.nth(safeIndex).click();
    await panel.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  }


  async fillRequiredFields() {

    await this.selectOption(this.poVersion_dropdown, 0);
    await this.selectOption(this.branch_dropdown, 1);
    await this.selectOption(this.currency_dropdown, 0);
    await this.selectOption(this.currencyType_dropdown, 0);
    await this.selectOption(this.vendor_dropdown, 0);

    await this.page.waitForTimeout(2000);

    await this.page.locator('text=Select Financial Period').click();
    const fpPanel = this.page.locator('.p-select-overlay').last();
    await fpPanel.waitFor({ state: 'visible' });
    await fpPanel.locator('.p-select-option').first().click();
  }


  async addPurchaseLine() {

    await expect(this.addLine_btn).toBeEnabled({ timeout: 20000 });
    await this.addLine_btn.click();
    await this.page.locator('.p-dialog:visible').waitFor({ state: 'visible' });
  }


  async fillPurchaseLine(line: any) {

    const dialog = this.page.locator('.p-dialog:visible');

    const type_dropdown      = dialog.getByRole('combobox').nth(0);
    const group_dropdown     = dialog.getByRole('combobox').nth(1);
    const subGroup_dropdown  = dialog.getByRole('combobox').nth(2);
    const item_dropdown      = dialog.getByRole('combobox').nth(3);
    const uom_dropdown       = dialog.getByRole('combobox').nth(4);
    const costCenter_dropdown = dialog.getByRole('combobox').nth(5);
    const quantity_textbox   = dialog.getByPlaceholder('Enter Quantity');
    const unitPrice_textbox  = dialog.getByPlaceholder('Enter Unit Price');
    const saveLine_btn       = dialog.getByRole('button', { name: 'Save', exact: true });

    await this.selectOption(type_dropdown, line.typeIndex);
    await this.selectOption(group_dropdown, line.groupIndex);
    await this.selectOption(subGroup_dropdown, line.subGroupIndex);
    await this.selectOption(item_dropdown, line.itemIndex);
    await this.selectOption(uom_dropdown, line.uomIndex);

    const isCostCenterEnabled = await costCenter_dropdown.isEnabled();
    if (isCostCenterEnabled) {
      await this.selectOption(costCenter_dropdown, 0);
    }

    await quantity_textbox.fill(line.quantity);
    await unitPrice_textbox.fill(line.price);

    await expect(saveLine_btn).toBeEnabled();
    await saveLine_btn.click();
    await this.page.locator('.p-dialog').waitFor({ state: 'hidden' });
  }


  async addMultiplePurchaseLines(lines: any[]) {

    for (const line of lines) {
      await this.addPurchaseLine();
      await this.fillPurchaseLine(line);
    }
  }


  // ✅ NEW — Fill service line dialog
  // Steps: Select Type=Services → Service Name=Miscellaneous → Description → Cost Center=HR → Save
  async fillServiceLine(description: string = 'Service') {

    const dialog = this.page.locator('.p-dialog:visible');

    // Step 4: Select Type as "Services" (index 1)
    const type_dropdown = dialog.getByRole('combobox').nth(0);
    await this.selectOption(type_dropdown, 1);

    // Step 5: Select Service Name (index 1)
    const serviceName_dropdown = dialog.getByRole('combobox').nth(1);
    await this.selectOption(serviceName_dropdown, 1);

    // Step 6: Fill Description (mandatory)
    const description_input = dialog
      .locator('input[placeholder*="escription"], textarea[placeholder*="escription"]')
      .first();
    await description_input.waitFor({ state: 'visible' });
    await description_input.fill(description);

    // Step 7: Select Cost Center as "HR"
    const costCenter_dropdown = dialog.getByRole('combobox').nth(2);
    await costCenter_dropdown.waitFor({ state: 'visible' });
    await costCenter_dropdown.click();
    await this.page
      .locator('.p-select-option', { hasText: 'HR' })
      .waitFor({ state: 'visible' });
    await this.page
      .locator('.p-select-option', { hasText: 'HR' })
      .click();

    // Step 7b: Select Tax (first available option)
    const tax_dropdown = dialog.getByRole('combobox').nth(3);
    await this.selectOption(tax_dropdown, 0);

    // Step 8: Click Save on line popup
    const saveLine_btn = dialog.getByRole('button', { name: 'Save', exact: true });
    await expect(saveLine_btn).toBeEnabled({ timeout: 10000 });
    await saveLine_btn.click();
    await this.page.locator('.p-dialog').waitFor({ state: 'hidden' });
  }


  // ✅ NEW — Save as Draft then Save (used after service line)
  async saveAsDraftThenSave() {

    // Step 9: Click Save as Draft
    await expect(this.saveAsDraft_btn).toBeVisible({ timeout: 10000 });
    await this.saveAsDraft_btn.click();
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });

    // Step 10: Click Save
    await expect(this.save_btn).toBeVisible({ timeout: 10000 });
    await this.save_btn.click();
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  }


  async submitPurchaseOrder() {

    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });

    await expect(this.submit_btn).toBeVisible({ timeout: 15000 });
    await expect(this.submit_btn).toBeEnabled({ timeout: 10000 });
    await this.submit_btn.click();

    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });

    await expect(
      this.page.getByText('Purchase Order Submitted Successfully')
    ).toBeVisible({ timeout: 15000 });
  }
}