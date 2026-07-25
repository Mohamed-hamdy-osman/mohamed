import { expect, type Locator, type Page } from '@playwright/test';

export class StandardInvoicePage {

  readonly page: Page;

  readonly createBtn: Locator;
  readonly standardBtn: Locator;
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
    this.standardBtn = page.getByRole('button', { name: 'Standard' });

    this.branchDropdown = page.getByRole('combobox', { name: 'Branch' });
    this.vendorDropdown = page.getByRole('combobox', { name: 'Select Vendor', exact: true });

    this.fiscalPeriod = page.getByRole('combobox', { name: 'Fiscal Period' });

    this.vendorCode = page.locator(
      'input[id="vendorCode"], input[formcontrolname="vendorCode"]'
    );

    this.vendorSiteDropdown = page.getByRole('combobox', {
      name: 'Select Vendor Site'
    });

    this.vendorAccountDropdown = page.getByRole('combobox', {
      name: 'Select Vendor Account'
    });

    this.vendorInvoiceNumber = page.getByRole('textbox', {
      name: 'Vendor Invoice Number'
    });

    this.vendorInvoiceAmount = page.getByRole('textbox', {
      name: 'Vendor Invoice Amount'
    });

    this.paymentMethodDropdown = page.getByRole('combobox', {
      name: 'Payment Method'
    });

    this.invoiceType = page
      .locator('small')
      .filter({ hasText: 'Standard' });

    this.categoryDropdown = page.getByLabel('Category');
    this.sequence = page.getByLabel('Sequence');

    this.currencyDropdown = page.getByRole('combobox', {
      name: 'Currency'
    });

    this.exchangeRate = page.getByLabel('Exchange Rate');

    this.equivalentInvoiceAmount = page.getByText('--').first();

    this.invoiceDate = page.getByLabel('Invoice Date');

    this.glDate = page.getByLabel('GL Date');

    this.paymentTermDropdown = page.getByLabel('Payment Term');

    this.dueDate = page.getByText('--').nth(1);

    this.addLineBtn = page.getByRole('button', {
      name: 'Add Line'
    });

    this.saveBtn = page.getByRole('button', {
      name: 'Save'
    });

    this.submitBtn = page.getByRole('button', {
      name: 'Submit'
    });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({
      state: 'hidden'
    });
  }

  async selectFromPanel(panel: Locator, itemText: string) {
    await panel.waitFor({ state: 'visible' });

    await panel
      .locator('li')
      .filter({ hasText: itemText })
      .first()
      .click();
  }

  async createStandardInvoice() {

  // 1- Click Create
  await this.createBtn.click();

  // 2- Select Standard
  await this.standardBtn.click();

  // 3- Wait for Select PO Dialog
  const selectPODialog = this.page.locator('.p-dialog:visible');
  await selectPODialog.waitFor({ state: 'visible' });

  // 4- Select First PO
  const firstRowRadio = selectPODialog.locator('input[type="radio"]').first();

  await firstRowRadio.check();

  // 5- Verify Next Enabled
  const nextBtn = selectPODialog.getByRole('button', { name: 'Next', exact: true });

  await expect(nextBtn).toBeEnabled();

  // 6- Click Next
  await nextBtn.click();

  await this.waitForLoader();

  // -------- Popup 2 starts here --------

  const secondDialog = this.page.locator('.p-dialog:visible');

  await secondDialog.waitFor({ state: 'visible' });

/* ===========================
   Select All (Top Table)
=========================== */

// Wait for the "Select Invoice Lines" table rows to load (excludes step-1 PO table)
const topTable = secondDialog
  .locator('table')
  .filter({ has: secondDialog.page().locator('thead input.p-checkbox-input:not([disabled])') })
  .first();

await topTable.locator('tbody tr').first().waitFor({ state: 'visible' });

const topSelectAll = topTable.locator('thead input.p-checkbox-input');

await topSelectAll.check();

/* ===========================
   Verify Selected Invoice Lines Appeared
=========================== */

const billUnitPriceInputs = secondDialog.locator(
  'input[placeholder="Bill Unit Price"]'
);

await expect(billUnitPriceInputs.first()).toBeVisible();

/* ===========================
   Select All (Bottom Table)
=========================== */

const bottomTable = secondDialog.locator('table').last();

// Wait for bottom table rows to load
await bottomTable.locator('tbody tr').first().waitFor({ state: 'visible' });

await bottomTable
  .locator('thead input.p-checkbox-input')
  .check();

/* ===========================
   Fill Bill Unit Price
=========================== */

const bottomTbody = secondDialog.locator('tbody').last();

const rows = bottomTbody.locator('tr');

const rowCount = await rows.count();

for (let i = 0; i < rowCount; i++) {

  const row = rows.nth(i);

  const unitPrice = (
    await row.locator('td').nth(11).textContent()
  )?.trim();

  expect(unitPrice).toBeTruthy();

  const billUnitPrice = row.locator(
    'input[placeholder="Bill Unit Price"]'
  );

  await billUnitPrice.click({ clickCount: 3 });
  await billUnitPrice.pressSequentially(unitPrice!);
  await billUnitPrice.press('Tab');
}


/* ===========================
   Verify Create Invoice Enabled
=========================== */

const createInvoiceBtn = secondDialog.getByRole('button', {
  name: 'Create Invoice'
});

await expect(createInvoiceBtn).toBeEnabled();

/* ===========================
   Click Create Invoice
=========================== */

await createInvoiceBtn.click();

await secondDialog.waitFor({
    state: 'hidden'
});

await this.waitForLoader();
  }
}