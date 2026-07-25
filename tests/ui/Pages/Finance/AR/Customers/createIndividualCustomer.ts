import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Individual-customer variant of CreateCustomerCorporatePage.
 * Shares the same page/dialog and most fields, but:
 *  - Customer Type must be switched to "Individual" (Corporate is the default)
 *  - Tax Card Number and Commercial Registration Number are NOT present/used
 *  - Nationality, National ID Type, National ID, Date of Birth, and Gender
 *    fields appear instead (Individual-only fields)
 *
 * All ids below are CONFIRMED against the real DOM.
 */
export class CreateCustomerIndividualPage {

  readonly page: Page;

  // Main list page
  readonly createBtn: Locator;

  // Step 1 dialog - chooser
  readonly createCustomerBtn: Locator;
  readonly linkCustomerBtn: Locator; // disabled unless a row is selected; not used in the create flow

  // Create-customer page fields
  readonly customerNameInput: Locator;      // id="name"
  readonly salesPersonSelect: Locator;      // id="salesPersonId" - SEARCHABLE
  readonly descriptionTextarea: Locator;    // placeholder "Enter Description"
  readonly individualRadio: Locator;        // id="customerType_Individual"
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

  // Individual-only fields
  readonly nationalitySelect: Locator;      // aria-label "Select Customer Nationality" - SEARCHABLE
  readonly nationalIdTypeSelect: Locator;   // aria-label "National ID" - first-index pick
  readonly nationalIdInput: Locator;        // id="nationalId"
  readonly dateOfBirthInput: Locator;       // placeholder "Date of Birth"
  readonly genderSelect: Locator;           // aria-label "Select Gender" - first-index pick

  readonly categorySelect: Locator;         // id="corporateCustomerCategoryId" - SEARCHABLE
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
    this.individualRadio = page.locator('#customerType_Individual');
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

    // Individual-only fields (targeted by aria-label since ids weren't shared)
    this.nationalitySelect = page.getByRole('combobox', { name: 'Select Customer Nationality', exact: true });
    this.nationalIdTypeSelect = page.getByRole('combobox', { name: /national id type/i });
    this.nationalIdInput = page.locator('#nationalId');
    this.dateOfBirthInput = page.getByPlaceholder('Date of Birth');
    this.genderSelect = page.getByRole('combobox', { name: 'Select Gender', exact: true });

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
    const overlay = this.page.locator('.p-select-overlay').last();
    const option = overlay.locator('.p-select-option').nth(optionIndex);
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  // Type a date into a PrimeNG p-datepicker input using pressSequentially (DD/MM/YYYY)
  private async typeDateIntoInput(inputLocator: Locator, day: number, month: number, year: number) {
    const formatted = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    await inputLocator.click();
    await inputLocator.pressSequentially(formatted, { delay: 50 });
    await this.page.keyboard.press('Tab');
    await expect(inputLocator).toHaveValue(formatted);
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

  async searchNationality(searchText: string) {
    await this.selectOptionBySearch(this.nationalitySelect, searchText);
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

  async createCustomerIndividual(
    salesPersonText = 'Mohamed Ahmed Osman Hamdy',
    countryIndex = 0,
    cityText = 'Cairo',
    districtText = 'Ramses',
    nationalityText = 'Egyptian',
    categoryText = 'Jan Category',
    receivableAccountText = 'Cars',
    depositAccountText = 'Funds',
    salesAccountText = 'IPV'
  ) {

    const uniqueSuffix = Date.now().toString().slice(-8);
    // National ID must be exactly 14 digits and unique - pad the timestamp suffix.
    const uniqueNationalId = uniqueSuffix.padStart(14, '2');

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

    // Customer Name (unique)
    await this.customerNameInput.waitFor({ state: 'visible' });
    await this.customerNameInput.fill(`Mohamed Hamdy${uniqueSuffix}`);

    // Sales Person - search and select
    await this.searchSalesPerson(salesPersonText);

    // 1. Select "Individual" customer type (default is Corporate)
    await this.individualRadio.check();
    await this.waitForLoader();

    // Phone Number
    await this.phoneNumberInput.fill('01045678923');

    // Email (unique)
    await this.emailInput.fill(`hamdy+${uniqueSuffix}@gmail.com`);

    // Country must be selected first to enable City, then City to enable District.
    await this.selectOptionByIndex(this.countrySelect, countryIndex);
    await this.waitForLoader();
    await expect(this.citySelect).toBeEnabled();

    // City - search and select
    await this.searchCity(cityText);
    await this.waitForLoader();
    await expect(this.districtSelect).toBeEnabled();

    // District - search and select
    await this.searchDistrict(districtText);

    // Postal Code (unique)
    await this.postalCodeInput.fill(uniqueSuffix);

    // Address Details
    await this.addressDetailsInput.fill('57 Ramses Street, Azbakeya, Cairo 11522');

    // Address Name
    await this.addressNameInput.fill('Ramses In Railway Station');

    // 2 & 3. Tax Card Number and Commercial Registration Number are removed
    // for Individual customers - intentionally not filled here.

    // 4. Nationality - search and select
    await this.searchNationality(nationalityText);
    await this.waitForLoader();

    // 5. National ID Type - select first index ("National ID")
    await this.nationalIdTypeSelect.waitFor({ state: 'visible' });
    await this.selectOptionByIndex(this.nationalIdTypeSelect, 0);

    // 6. National ID - unique 14-digit number
    await this.nationalIdInput.fill(uniqueNationalId);

    // 7. Date of Birth (DD/MM/YYYY)
    await this.typeDateIntoInput(this.dateOfBirthInput, 1, 6, 1995);

    // 8. Gender - select first index ("Male")
    await this.selectOptionByIndex(this.genderSelect, 0);

    // Category - search and select
    await this.searchCategory(categoryText);

    // Receivable Account - search and select
    await this.searchReceivableAccount(receivableAccountText);

    // Deposit Account - search and select
    await this.searchDepositAccount(depositAccountText);

    // Sales Account - search and select
    await this.searchSalesAccount(salesAccountText);

    // Click Save
    await expect(this.saveBtn).toBeEnabled();
    await this.saveBtn.click();

    await this.waitForLoader();
  }

  async verifyCustomerIndividualCreated() {
    await expect(this.page).not.toHaveURL(/customers-add/);
    await expect(this.createBtn).toBeVisible();
  }
}