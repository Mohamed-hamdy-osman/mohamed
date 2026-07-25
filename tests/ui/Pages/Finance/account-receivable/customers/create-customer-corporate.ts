import { expect, type Locator, type Page } from '@playwright/test';

/**
 * All field locators below are CONFIRMED against the real DOM of
 * /zeta/account-receivable/customers-add.
 */
export class CreateCustomerCorporatePage {

  readonly page: Page;

  // Main list page
  readonly createBtn: Locator;

  // Step 1 dialog - chooser
  readonly createCustomerBtn: Locator;
  readonly linkCustomerBtn: Locator; // disabled unless a row is selected; not used in the create flow

  // Step 2 - the create-customer page (URL: .../customers-add)
  readonly customerNameInput: Locator;      // id="name"
  readonly salesPersonSelect: Locator;      // id="salesPersonId" - SEARCHABLE
  readonly descriptionTextarea: Locator;    // placeholder "Enter Description"
  readonly individualRadio: Locator;
  readonly corporateRadio: Locator;
  readonly inactivationDateInput: Locator;  // left empty per requirements
  readonly phoneNumberInput: Locator;       // id="phoneNumber"
  readonly emailInput: Locator;             // id="email", placeholder "Email"
  readonly faxNumberInput: Locator;         // id="faxNumber"
  readonly countrySelect: Locator;          // id="countryId" - first-index pick
  readonly citySelect: Locator;             // id="cityId" - SEARCHABLE
  readonly districtSelect: Locator;         // id="districtId" - SEARCHABLE
  readonly postalCodeInput: Locator;        // id="postalCode"
  readonly addressDetailsInput: Locator;    // id="addressDetails"
  readonly addressNameInput: Locator;       // id="addressName"
  readonly taxCardNumberInput: Locator;     // id="taxCardNumber"
  readonly commercialRegistrationNumberInput: Locator; // id="commercialRegistrationNumber"
  readonly categorySelect: Locator;         // id="corporateCustomerCategoryId" - SEARCHABLE (NOT "categoryId")
  readonly receivableAccountSelect: Locator; // id="debitAccountId" - SEARCHABLE
  readonly depositAccountSelect: Locator;    // id="depositAccountId" - SEARCHABLE
  readonly salesAccountSelect: Locator;      // id="salesAccountId" - SEARCHABLE
  readonly saveBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.createBtn = page.getByRole('button', { name: 'Create' });

    // Chooser dialog
    const chooserDialog = page.locator('.p-dialog:visible');
    this.createCustomerBtn = chooserDialog.getByRole('button', { name: 'Create Customer', exact: true });
    this.linkCustomerBtn = chooserDialog.getByRole('button', { name: 'Link Customer', exact: true });

    // Create-customer page fields
    this.customerNameInput = page.locator('#name');
    this.salesPersonSelect = page.locator('#salesPersonId');
    this.descriptionTextarea = page.getByPlaceholder('Enter Description');
    this.individualRadio = page.getByText('Individual', { exact: true });
    this.corporateRadio = page.getByText('Corporate', { exact: true });
    this.inactivationDateInput = page.getByPlaceholder('Inactivation date (Optional)');
    this.phoneNumberInput = page.locator('#phoneNumber');
    this.emailInput = page.locator('#email');
    this.faxNumberInput = page.locator('#faxNumber');

    this.countrySelect = page.locator('#countryId');
    this.citySelect = page.locator('#cityId');
    this.districtSelect = page.locator('#districtId');

    this.postalCodeInput = page.locator('#postalCode');
    this.addressDetailsInput = page.locator('#addressDetails');
    this.addressNameInput = page.locator('#addressName');
    this.taxCardNumberInput = page.locator('#taxCardNumber');
    this.commercialRegistrationNumberInput = page.locator('#commercialRegistrationNumber');
    this.categorySelect = page.locator('#corporateCustomerCategoryId');
    this.receivableAccountSelect = page.locator('#debitAccountId');
    this.depositAccountSelect = page.locator('#depositAccountId');
    this.salesAccountSelect = page.locator('#salesAccountId');
    this.saveBtn = page.getByRole('button', { name: 'Save', exact: true });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  }

  // Select an option of a p-select dropdown by index (default: first)
  private async selectOptionByIndex(trigger: Locator, optionIndex = 0) {
    await trigger.click();
    const option = this.page.locator('.p-select-overlay .p-select-option').nth(optionIndex);
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  // Type into a searchable p-select and pick the matching option
  private async selectOptionBySearch(trigger: Locator, searchText: string) {
    await trigger.click();
    const overlay = this.page.locator('.p-select-overlay').last();
    const searchInput = overlay.locator('input[role="searchbox"]');
    await searchInput.fill(searchText);
    const option = overlay
      .locator('.p-select-option')
      .filter({ hasText: searchText })
      .first();
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  async searchSalesPerson(searchText: string) {
    await this.selectOptionBySearch(this.salesPersonSelect, searchText);
  }

  async searchCity(searchText: string) {
    await this.selectOptionBySearch(this.citySelect, searchText);
  }

  async searchDistrict(searchText: string) {
    await this.selectOptionBySearch(this.districtSelect, searchText);
  }

  async searchCategory(searchText: string) {
    await this.selectOptionBySearch(this.categorySelect, searchText);
  }

  async searchReceivableAccount(searchText: string) {
    await this.selectOptionBySearch(this.receivableAccountSelect, searchText);
  }

  async searchDepositAccount(searchText: string) {
    await this.selectOptionBySearch(this.depositAccountSelect, searchText);
  }

  async searchSalesAccount(searchText: string) {
    await this.selectOptionBySearch(this.salesAccountSelect, searchText);
  }

  async createCustomerCorporate(
    salesPersonText = 'Mohamed Ahmed Osman Hamdy',
    countryIndex = 0,
    cityText = 'Cairo',
    districtText = 'Ramses',
    categoryText = 'Jan Category',
    receivableAccountText = 'Cars',
    depositAccountText = 'Funds',
    salesAccountText = 'IPV'
  ) {

    const uniqueSuffix = Date.now().toString().slice(-8);

    // 1. Click on Create button
    await expect(this.createBtn).toBeEnabled();
    await this.createBtn.click();

    await this.waitForLoader();

    // 2. Chooser dialog is displayed
    await this.page.locator('.p-dialog:visible').waitFor({ state: 'visible' });

    // 3. Click "Create Customer"
    await expect(this.createCustomerBtn).toBeEnabled();
    await this.createCustomerBtn.click();

    await this.waitForLoader();

    // 5. Customer Name (unique)
    await this.customerNameInput.waitFor({ state: 'visible' });
    await this.customerNameInput.fill(`Mohamed Hamdy${uniqueSuffix}`);

    // 6. Sales Person - search and select
    await this.searchSalesPerson(salesPersonText);

    // 7. Phone Number
    await this.phoneNumberInput.fill('01045678923');

    // 8. Email (unique)
    await this.emailInput.fill(`hamdy+${uniqueSuffix}@gmail.com`);

    // 9. Fax Number
    await this.faxNumberInput.fill('01045678923');

    // 10-11. Country must be selected first to enable City, then City to enable District.
    // Country - select first index ("Egypt")
    await this.selectOptionByIndex(this.countrySelect, countryIndex);
    await this.waitForLoader();
    await expect(this.citySelect).toBeEnabled();

    // 12. City - search and select
    await this.searchCity(cityText);
    await this.waitForLoader();
    await expect(this.districtSelect).toBeEnabled();

    // 13. District - search and select
    await this.searchDistrict(districtText);

    // 14. Postal Code (unique)
    await this.postalCodeInput.fill(uniqueSuffix);

    // 15. Address Details
    await this.addressDetailsInput.fill('57 Ramses Street, Azbakeya, Cairo 11522');

    // 16. Address Name
    await this.addressNameInput.fill('Ramses In Railway Station');

    // 17. Tax Card Number
    await this.taxCardNumberInput.fill('1234567890');

    // 18. Commercial Registration Number
    await this.commercialRegistrationNumberInput.fill('1234567890');

    // 19. Category - search and select
    await this.searchCategory(categoryText);

    // 20. Receivable Account - search and select
    await this.searchReceivableAccount(receivableAccountText);

    // 21. Deposit Account - search and select
    await this.searchDepositAccount(depositAccountText);

    // 22. Sales Account - search and select
    await this.searchSalesAccount(salesAccountText);

    // 23. Click Save
    await expect(this.saveBtn).toBeEnabled();
    await this.saveBtn.click();

    await this.waitForLoader();
  }

  async verifyCustomerCorporateCreated() {
    await expect(this.page).not.toHaveURL(/customers-add/);
    await expect(this.createBtn).toBeVisible();
  }
}