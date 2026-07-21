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
    this.currencyDropdown = page.getByLabel('Currency');
    this.exchangeRate = page.getByLabel('Exchange Rate');
    this.equivalentInvoiceAmount = page.getByText('--').first();
    this.invoiceDate = page.getByLabel('Invoice Date');
    this.glDate = page.getByLabel('GL Date');
    this.paymentTermDropdown = page.getByLabel('Payment Term');
    this.dueDate = page.getByText('--').nth(1);
    this.addLineBtn = page.getByRole('button', { name: 'Add Line' });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
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

  // 5- Vendor = Mohamed Hamdy
  await this.vendorDropdown.click();
  const vendorPanel = this.page.locator('.p-dropdown-panel, .p-dropdown-items-wrapper, .p-overlay').last();
  await vendorPanel.waitFor({ state: 'visible' });
  await vendorPanel.locator('li').first().click();

  await this.waitForLoader();

  // 6- Fiscal Period (View Only - read-only display, no assertion needed)

  // 7- Vendor Code (View Only - displayed as read-only text, no assertion needed)

  // 8- Vendor Site & Vendor Account (Skip)

  // 9- Vendor Invoice Number
  await this.vendorInvoiceNumber.fill('8001');

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

  // 15- Currency (First Option)
  await this.currencyDropdown.click();
  const currencyPanel = this.page.locator('.p-dropdown-panel, .p-dropdown-items-wrapper, .p-overlay').last();
  await currencyPanel.waitFor({ state: 'visible' });
  await currencyPanel.locator('li').first().click();

  // 16- Exchange Rate Type (Skip)

  // 17- Exchange Rate (View Only)
  await expect(this.exchangeRate).toBeDisabled();

  // 18- Equivalent Invoice Amount (View Only)
  await expect(this.equivalentInvoiceAmount).toBeVisible();

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

  // 23- Add Line Button
  await expect(this.addLineBtn).toBeVisible();

}
}