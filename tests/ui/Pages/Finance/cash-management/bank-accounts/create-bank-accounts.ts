import { expect, type Locator, type Page } from '@playwright/test';

export class CreateBankAccountPage {

  readonly page: Page;

  readonly createBtn: Locator;

  // Bank / Branch
  readonly bankSelect: Locator;
  readonly branchSelect: Locator;

  // Account Info
  readonly nameInput: Locator;
  readonly accountNumberInput: Locator;
  readonly ibanInput: Locator;
  readonly swiftCodeInput: Locator;
  readonly accountTypeSelect: Locator;
  readonly corporateBranchesMultiselect: Locator;
  readonly currencySelect: Locator;
  readonly acceptedCurrenciesMultiselect: Locator;

  // Available For
  readonly accountPayableCheckbox: Locator;
  readonly accountReceivableCheckbox: Locator;
  readonly payrollCheckbox: Locator;

  // Accounts
  // NOTE: in the app's markup the label "Cash Cleaning Account" is bound to
  // id="ClearingAccountId", and the label "Clearing Account" is bound to
  // id="CashClearingAccountId" (the ids are swapped vs. the visible labels).
  // The property names below follow the VISIBLE LABEL, and point at the
  // matching id, so callers can reason about the UI rather than the bug.
  readonly cashCleaningAccountSelect: Locator;
  readonly clearingAccountSelect: Locator;

  // Cheque Book
  readonly chequeBookNameInput: Locator;
  readonly startSerialNumberInput: Locator;
  readonly numberOfCheckPagesInput: Locator;
  readonly addChequeBookBtn: Locator;

  readonly activeToggle: Locator;
  readonly saveBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.createBtn = page.getByRole('button', { name: 'Create' });

    const dialog = page.locator('.p-dialog:visible');

    this.bankSelect = dialog.locator('#bankId');
    this.branchSelect = dialog.locator('#branchId');

    this.nameInput = page.getByPlaceholder('Enter Account Name');
    this.accountNumberInput = page.getByPlaceholder('Enter Account Number');
    this.ibanInput = page.getByPlaceholder('Enter IBAN');
    this.swiftCodeInput = page.getByPlaceholder('Enter Swift Code');
    this.accountTypeSelect = dialog.locator('#accountType');
    this.corporateBranchesMultiselect = dialog.locator('#corporateBranchIds');
    this.currencySelect = dialog.locator('#PrimaryCurrencyId');
    this.acceptedCurrenciesMultiselect = dialog.locator('#AcceptedCurrencies');

    this.accountPayableCheckbox = page.locator('#UseForAccountPayablecheckboxx');
    this.accountReceivableCheckbox = page.locator('#UseForAccountReceivablecheckboxx');
    this.payrollCheckbox = page.locator('#UseForPayrollcheckboxx');

    this.cashCleaningAccountSelect = dialog.locator('#ClearingAccountId');
    this.clearingAccountSelect = dialog.locator('#CashClearingAccountId');

    this.chequeBookNameInput = page.getByPlaceholder('Enter Checkbook Name');
    this.startSerialNumberInput = page.getByPlaceholder('Enter Start Serial Number');
    this.numberOfCheckPagesInput = page.getByPlaceholder('Enter Number Of Pages');
    this.addChequeBookBtn = page.getByRole('button', { name: 'Add Cheque Book' });

    this.activeToggle = page.locator('.p-dialog:visible p-toggleswitch');
    this.saveBtn = page
      .locator('.p-dialog:visible')
      .getByRole('button', { name: 'Save' });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  }

  // Select the first option of a p-select dropdown
  private async selectFirstOption(trigger: Locator) {
    await trigger.click();
    const option = this.page.locator('.p-select-overlay .p-select-option').first();
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  // Select an option of a p-select dropdown by visible text
  private async selectOptionByText(trigger: Locator, text: string) {
    await trigger.click();
    const option = this.page
      .locator('.p-select-overlay .p-select-option')
      .filter({ hasText: text })
      .first();
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  // Click the "select all" header checkbox in a p-multiselect
  private async selectAllInMultiselect(trigger: Locator) {
    await trigger.click();
    const selectAllCheckbox = this.page.locator(
      '.p-multiselect-overlay input[type="checkbox"][aria-label="All items unselected"]'
    );
    await selectAllCheckbox.waitFor({ state: 'visible' });
    await selectAllCheckbox.click();
    await this.page.keyboard.press('Escape');
  }

  // Filter a p-multiselect and select the matching option (leaves overlay open for multiple picks)
  private async filterAndSelectInMultiselect(trigger: Locator, filterText: string, openOverlay = true) {
    if (openOverlay) {
      await trigger.click();
    }
    const filterInput = this.page.locator('.p-multiselect-overlay input[role="searchbox"]');
    await filterInput.fill(filterText);
    const option = this.page
      .locator('.p-multiselect-overlay .p-multiselect-option')
      .filter({ hasText: filterText })
      .first();
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  async createBankAccount() {

    const uniqueSuffix = Date.now().toString().slice(-8);

    await expect(this.createBtn).toBeEnabled();
    await this.createBtn.click();

    await this.waitForLoader();
    await this.page.locator('.p-dialog:visible').waitFor({ state: 'visible' });

    // Bank
    await this.selectFirstOption(this.bankSelect);

    // Bank Branch
    await this.selectFirstOption(this.branchSelect);

    // Name
    await this.nameInput.fill('Bank Account');

    // Account Number
    await this.accountNumberInput.fill(`18000212345678901234${uniqueSuffix}`);

    // IBAN
    await this.ibanInput.fill('EG38 0019 0005 0000 0000 2631 8000 2');

    // Swift Code
    await this.swiftCodeInput.fill('BDACEGCA');

    // Account Type
    await this.selectFirstOption(this.accountTypeSelect);

    // Corporate Branches - select all
    await this.selectAllInMultiselect(this.corporateBranchesMultiselect);

    // Currency - search for "EGP" and select it
    await this.selectOptionByText(this.currencySelect, 'EGP');

    // Accepted Other Currencies - search & select "USD" and "EUR"
    await this.filterAndSelectInMultiselect(this.acceptedCurrenciesMultiselect, 'USD', true);
    await this.filterAndSelectInMultiselect(this.acceptedCurrenciesMultiselect, 'EUR', false);
    await this.page.keyboard.press('Escape');

    // Available For - Account Payable
    await this.accountPayableCheckbox.check();

    // Accounts
    await this.selectFirstOption(this.cashCleaningAccountSelect);
    await this.selectFirstOption(this.clearingAccountSelect);

    // Cheque Book
    await this.chequeBookNameInput.fill('John Smith and Jane Smith');
    await this.startSerialNumberInput.fill('10000187');
    await this.numberOfCheckPagesInput.fill('50');

    // Save
    await expect(this.saveBtn).toBeEnabled();
    await this.saveBtn.click();

    await this.page.locator('.p-dialog').waitFor({ state: 'hidden' });
    await this.waitForLoader();
  }

  async verifyBankAccountCreated() {
    await expect(this.page).toHaveURL(/cash-management\/bank-accounts/);
    await expect(this.page.locator('.p-dialog')).toBeHidden();
    await expect(this.createBtn).toBeVisible();
  }
}