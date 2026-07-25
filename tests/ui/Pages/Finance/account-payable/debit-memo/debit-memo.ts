import { expect, type Locator, type Page } from '@playwright/test';

export class DebitMemoPage {

  readonly page: Page;

  readonly createBtn: Locator;
  readonly debitMemoBtn: Locator;
  readonly branchDropdown: Locator;
  readonly vendorDropdown: Locator;
  readonly fiscalPeriod: Locator;
  readonly vendorCode: Locator;
  readonly vendorSiteDropdown: Locator;
  readonly vendorAccountDropdown: Locator;
  readonly vendorInvoiceNumber: Locator;
  readonly vendorInvoiceAmount: Locator;
  readonly paymentMethodDropdown: Locator;
  readonly invoiceType: Locator;
  readonly categoryDropdown: Locator;
  readonly sequence: Locator;
  readonly currencyDropdown: Locator;
  readonly exchangeRate: Locator;
  readonly equivalentInvoiceAmount: Locator;
  readonly invoiceDate: Locator;
  readonly glDate: Locator;
  readonly paymentTermDropdown: Locator;
  readonly dueDate: Locator;
  readonly addLineBtn: Locator;
  readonly saveBtn: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.createBtn = page.getByRole('button', { name: 'Create' });
    this.debitMemoBtn = page.getByRole('button', { name: 'Debit Memo' });

    this.branchDropdown = page.getByRole('combobox', { name: 'Branch' });
    this.vendorDropdown = page.getByRole('combobox', { name: 'Select Vendor', exact: true });
    this.fiscalPeriod = page.getByRole('combobox', { name: 'Fiscal Period' });
    this.vendorCode = page.locator('input[id="vendorCode"], input[formcontrolname="vendorCode"]');
    this.vendorSiteDropdown = page.getByRole('combobox', { name: 'Select Vendor Site' });
    this.vendorAccountDropdown = page.getByRole('combobox', { name: 'Select Vendor Account' });
    this.vendorInvoiceNumber = page.getByRole('textbox', { name: 'Vendor Invoice Number' });
    this.vendorInvoiceAmount = page.getByRole('textbox', { name: 'Vendor Invoice Amount' });
    this.paymentMethodDropdown = page.getByRole('combobox', { name: 'Payment Method' });
    this.invoiceType = page.locator('small').filter({ hasText: 'Debit Memo' });
    this.categoryDropdown = page.getByLabel('Category');
    this.sequence = page.getByLabel('Sequence');
    this.currencyDropdown = page.getByRole('combobox', { name: 'Currency' });
    this.exchangeRate = page.getByLabel('Exchange Rate');
    this.equivalentInvoiceAmount = page.getByText('--').first();
    this.invoiceDate = page.getByLabel('Invoice Date');
    this.glDate = page.getByLabel('GL Date');
    this.paymentTermDropdown = page.getByLabel('Payment Term');
    this.dueDate = page.getByText('--').nth(1);
    this.addLineBtn = page.getByRole('button', { name: 'Add Line' });
    this.saveBtn = page.getByRole('button', { name: 'Save' });
    this.submitBtn = page.locator('app-create-invoice-without-po-debit-memo p-button button').filter({ hasText: /submit/i });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  }

  async selectFromPanel(panel: Locator, itemText: string) {
    await panel.waitFor({ state: 'visible' });
    await panel.locator('li').filter({ hasText: itemText }).first().click();
  }

  async createDebitMemoInvoice() {

    // 1- Click Create
    await this.createBtn.click();

    // 2- Select Debit Memo
    await this.debitMemoBtn.click();

    await this.waitForLoader();

    // 3- Verify Navigation
    await expect(this.page).toHaveURL(/create-invoice-without-Po-debit-memo/);

    // 4- Branch = Cairo Branch (second option)
    await this.branchDropdown.click();
    const branchPanel = this.page.locator('.p-dropdown-panel, .p-dropdown-items-wrapper, .p-overlay').last();
    await branchPanel.waitFor({ state: 'visible' });
    await expect(branchPanel.locator('li').nth(1)).toBeVisible({ timeout: 15000 });
    await branchPanel.locator('li').nth(1).click();

    await this.waitForLoader();

    // Wait for page to stabilize after branch selection
    await this.page.waitForTimeout(1500);

    // 5- Vendor = first available
    await this.vendorDropdown.click();
    const vendorPanel = this.page.locator('.p-dropdown-panel, .p-dropdown-items-wrapper, .p-overlay').last();
    await vendorPanel.waitFor({ state: 'visible' });
    await vendorPanel.locator('li').first().click();

    await this.waitForLoader();

    // 6- Fiscal Period (View Only - read-only display, no assertion needed)

    // 7- Vendor Code (View Only - displayed as read-only text, no assertion needed)

    // 8- Vendor Site & Vendor Account (Skip)

   const vendorInvoiceNumber = `${Date.now()}`;

   // 9- Vendor Invoice Number
    await this.vendorInvoiceNumber.fill(vendorInvoiceNumber);
    // 10- Vendor Invoice Amount
    await this.vendorInvoiceAmount.fill('114');

    // 11- Payment Method (First Option)
    await this.paymentMethodDropdown.click();
    const paymentMethodPanel = this.page.locator('.p-dropdown-panel, .p-dropdown-items-wrapper, .p-overlay').last();
    await paymentMethodPanel.waitFor({ state: 'visible' });
    await paymentMethodPanel.locator('li').first().click();

    // 12- Invoice Type (View Only)
    await expect(this.invoiceType).toBeVisible();

    // 13- Category (Skip)

    // 14- Sequence (Skip)

    // 15- Currency (Skip - auto-selected)

    // 16- Exchange Rate Type (Skip)

    // 17- Exchange Rate (Skip)

    // 18- Equivalent Invoice Amount (Skip)

    // 19- Invoice Date (Skip)

    // 20- GL Date (Skip)

    // 21- Payment Term (First Option)
    await this.paymentTermDropdown.click();
    const paymentTermPanel = this.page.locator('.p-dropdown-panel, .p-dropdown-items-wrapper, .p-overlay').last();
    await paymentTermPanel.waitFor({ state: 'visible' });
    await paymentTermPanel.locator('li').first().click();

    await this.waitForLoader();

    // 22- Due Date (View Only)
    await expect(this.dueDate).toBeVisible();

    // 23- Wait for Add Line Button to be enabled then click
    await expect(this.addLineBtn).toBeEnabled({ timeout: 15000 });
    await this.addLineBtn.click();
  }

async addInvoiceLine() {

  // 24- Wait for Add Line dialog to open (button already clicked in createDebitMemoInvoice)
  const dialog = this.page.locator('.p-dialog:visible');
  await dialog.waitFor({ state: 'visible' });

  // 25- Item Name = Pepsi
  const itemDropdown = dialog.getByRole('combobox').first();
  await itemDropdown.click();

  const itemPanel = this.page.locator('.p-dropdown-panel, .p-dropdown-items-wrapper, .p-overlay').last();
  await itemPanel.waitFor({ state: 'visible' });
  await itemPanel.locator('li').filter({ hasText: 'Pepsi' }).first().click();

  await this.waitForLoader();

  // 26- UOM = كيلو
  const uomDropdown = dialog.getByRole('combobox').nth(1);
  await uomDropdown.click();

  const uomPanel = this.page.locator('.p-dropdown-panel, .p-dropdown-items-wrapper, .p-overlay').last();
  await uomPanel.waitFor({ state: 'visible' });
  await uomPanel.locator('li').filter({ hasText: 'كيلو' }).first().click();

  // 27- Quantity = 10
  await dialog.getByRole('textbox').nth(0).fill('10');

  // 28- Bill Unit Price = 10
  await dialog.getByRole('textbox').nth(1).fill('10');

  // 29- Vendor VAT Tax = Exclusive Tax
  const vatDropdown = dialog.getByRole('combobox').nth(2);
  await vatDropdown.click();

  const vatPanel = this.page.locator('.p-dropdown-panel, .p-dropdown-items-wrapper, .p-overlay').last();
  await vatPanel.waitFor({ state: 'visible' });
  await vatPanel.locator('li').filter({ hasText: 'Exclusive Tax' }).first().click();

  // 30- Vendor Withholding Tax = First Option
  const withholdingDropdown = dialog.getByRole('combobox').nth(3);
  await withholdingDropdown.click();

  const withholdingPanel = this.page.locator('.p-dropdown-panel, .p-dropdown-items-wrapper, .p-overlay').last();
  await withholdingPanel.waitFor({ state: 'visible' });
  await withholdingPanel.locator('li').first().click();

  // 31- Verify Save Button
  const saveLineBtn = dialog.getByRole('button', { name: 'Save' });

  await expect(saveLineBtn).toBeEnabled();

  await saveLineBtn.click();

  await this.page.locator('.p-dialog:visible').waitFor({ state: 'hidden', timeout: 15000 });
  }

  async submitInvoice() {
    const submitBtn = this.page.locator('xpath=/html/body/app-layout/div/div/div/div/div/app-content/div/app-create-invoice-without-po-debit-memo/div[2]/div[4]/div/div/p-button/button');
    await expect(submitBtn).toBeEnabled({ timeout: 15000 });
    await submitBtn.click({ force: true });
    await this.waitForLoader();
  }

 

}