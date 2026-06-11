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
  readonly costCenter_dropdown: Locator;
  readonly serviceName_dropdown: Locator;
  readonly description_textbox: Locator;
  readonly quantity_textbox: Locator;
  readonly unitPrice_textbox: Locator;
  readonly saveLine_btn: Locator;
  readonly submit_btn: Locator;

  constructor(page: Page) {

    this.page = page;

    this.branch_dropdown          = page.getByRole('combobox').nth(0);
    this.requester_dropdown       = page.getByRole('combobox').nth(1);
    this.financialPeriod_dropdown = page.getByRole('combobox').nth(2);
    this.addLine_btn              = page.getByRole('button', { name: 'Add Line' });
    this.type_dropdown            = page.getByRole('combobox').nth(3);
    this.group_dropdown           = page.getByRole('combobox').nth(4);
    this.subGroup_dropdown        = page.getByRole('combobox').nth(5);
    this.item_dropdown            = page.getByRole('combobox').nth(6);
    this.uom_dropdown             = page.getByRole('combobox').nth(7);
    this.costCenter_dropdown      = page.getByRole('combobox').nth(8);
    this.serviceName_dropdown     = page.getByRole('combobox').nth(4);
    this.description_textbox      = page.locator("textarea[placeholder='Description']").first();
    this.quantity_textbox         = page.getByPlaceholder('Enter Quantity');
    this.unitPrice_textbox        = page.getByPlaceholder('Enter Unit Price');
    this.saveLine_btn             = page.getByRole('button', { name: 'Save', exact: true });
    this.submit_btn               = page.getByRole('button', { name: 'Submit', exact: true });
  }


  // ✅ ENHANCED — uses .p-overlay panel scoping (matches PR selectOption behavior)
  // + loader wait guard before each interaction
  async selectOption(dropdown: Locator, index: number) {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 20000 });
    await dropdown.waitFor({ state: 'visible' });
    await dropdown.click();
    const panel = this.page.locator('.p-overlay:visible').last();
    await panel.waitFor({ state: 'visible' });
    const options = panel.locator('.p-select-option');
    await options.first().waitFor({ state: 'visible' });
    await options.nth(index).click({ force: true });
    await options.first().waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
  }


  async fillRequiredFields() {
    await this.selectOption(this.branch_dropdown, 0);
    await this.selectOption(this.requester_dropdown, 0);
    await this.selectOption(this.financialPeriod_dropdown, 0);
  }


  // ✅ ENHANCED — waits for dialog to be visible instead of just type_dropdown
  async addPurchaseLine() {
    await expect(this.addLine_btn).toBeEnabled({ timeout: 20000 });
    await this.addLine_btn.click();
    await this.page.locator('.p-dialog:visible').waitFor({ state: 'visible' });
  }


  async fillPurchaseLine(line: any) {

    await this.selectOption(this.type_dropdown, line.typeIndex);

    if (line.isService) {
      await this.selectOption(this.serviceName_dropdown, 0);
      await this.description_textbox.fill('service');
      await this.selectOption(this.costCenter_dropdown, 0);
      await this.unitPrice_textbox.fill('100');
    } else {
      await this.selectOption(this.group_dropdown, line.groupIndex);
      await this.selectOption(this.subGroup_dropdown, line.subGroupIndex);
      await this.selectOption(this.item_dropdown, line.itemIndex);
      await this.selectOption(this.uom_dropdown, line.uomIndex);

      if (line.withCostCenter) {
        await this.selectOption(this.costCenter_dropdown, 0);
      }

      await this.quantity_textbox.fill(line.quantity);
      await this.unitPrice_textbox.fill(line.price);
    }
  }


  async saveLine() {
    await expect(this.saveLine_btn).toBeEnabled({ timeout: 10000 });
    await this.saveLine_btn.click();
    // ✅ ENHANCED — wait for dialog to close after saving
    await this.page.locator('.p-dialog').waitFor({ state: 'hidden', timeout: 15000 });
  }


  async addMultiplePurchaseLines(lines: any[]) {
    for (const line of lines) {
      await this.addPurchaseLine();
      await this.fillPurchaseLine(line);
      await this.saveLine();
    }
  }


  // ✅ NEW — Fill service line dialog scoped to dialog locator
  // Supports both Miscellaneous (serviceIndex=0) and Freight (serviceIndex=1)
  async fillServiceLine(serviceIndex: number = 0, description: string = 'Service') {

    const dialog = this.page.locator('.p-dialog:visible');

    // Select Type as "Services" (index 1)
    const type_dropdown = dialog.getByRole('combobox').nth(0);
    await this.selectOption(type_dropdown, 1);

    // Select Service Name by index: 0=Miscellaneous, 1=Freight
    const serviceName_dropdown = dialog.getByRole('combobox').nth(1);
    await this.selectOption(serviceName_dropdown, serviceIndex);

    // Fill Description
    const description_input = dialog.locator(
      'input[placeholder*="escription"], textarea[placeholder*="escription"]'
    ).first();
    await description_input.waitFor({ state: 'visible' });
    await description_input.fill(description);

    // Select Cost Center (first available)
    const costCenter_dropdown = dialog.getByRole('combobox').nth(2);
    await this.selectOption(costCenter_dropdown, 0);

    // Select Tax (first available)
    const tax_dropdown = dialog.getByRole('combobox').nth(3);
    await this.selectOption(tax_dropdown, 0);

    // Enter Unit Price
    const unitPrice_input = dialog.getByPlaceholder('Enter Unit Price');
    await unitPrice_input.waitFor({ state: 'visible' });
    await unitPrice_input.fill('500');

    // Save Line
    const saveLine_btn = dialog.getByRole('button', { name: 'Save', exact: true });
    await expect(saveLine_btn).toBeEnabled({ timeout: 10000 });
    await saveLine_btn.click();
    await this.page.locator('.p-dialog').waitFor({ state: 'hidden' });
  }


  // ✅ NEW — Submit with full assertions + success message check
  async submitPurchaseRequest() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });
    const submitBtn = this.page.getByRole('button', { name: 'Submit', exact: true });
    await expect(submitBtn).toBeVisible({ timeout: 15000 });
    await expect(submitBtn).toBeEnabled({ timeout: 15000 });
    await expect(submitBtn).not.toHaveText('Save as Draft');
    await submitBtn.click();
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });
    await expect(
      this.page.getByText('Purchase Request Submitted Successfully')
    ).toBeVisible({ timeout: 15000 });
  }
}