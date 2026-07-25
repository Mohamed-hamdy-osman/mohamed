import { expect, type Locator, type Page } from '@playwright/test';

export class CreateBankPage {

  readonly page: Page;

  readonly createBtn: Locator;
  readonly bankName: Locator;
  readonly bankCode: Locator;

  readonly addBankBranchBtn: Locator;

  readonly branchName: Locator;
  readonly branchCode: Locator;

  readonly country: Locator;
  readonly city: Locator;
  readonly district: Locator;

  readonly address: Locator;
  readonly mobileNumber: Locator;
  readonly email: Locator;

  readonly saveBranchBtn: Locator;
  readonly editBankBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.createBtn = page.getByRole('button', { name: 'Create' });

    this.bankName = page.getByPlaceholder('Enter Bank Name');
    this.bankCode = page.getByPlaceholder('Enter Bank Code');

    this.addBankBranchBtn = page.getByRole('button', { name: 'Add Bank Branch' });

    this.branchName = page.getByPlaceholder('Enter Branch Name');
    this.branchCode = page.getByPlaceholder('Enter Code');

    this.country = page.locator('.p-dialog:visible p-select').nth(0);
    this.city = page.locator('.p-dialog:visible p-select').nth(1);
    this.district = page.locator('.p-dialog:visible p-select').nth(2);

    this.address = page.getByPlaceholder('Enter Address');
    this.mobileNumber = page.getByPlaceholder('Enter Mobile Number');
    this.email = page.getByPlaceholder('Enter Email');

    this.saveBranchBtn = page
      .locator('.p-dialog:visible')
      .getByRole('button', { name: 'Save' });

    this.editBankBtn = page.getByRole('button', { name: 'Edit Bank' });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  }

  async createBank() {

    const uniqueCode = Date.now().toString().slice(-6);
    const uniqueBankCode = uniqueCode;
    const uniqueBranchCode = (Number(uniqueCode) + 1).toString();

    await expect(this.createBtn).toBeEnabled();
    await this.createBtn.click();

    await this.waitForLoader();

    // Bank Information
    await this.bankName.fill('Bank Misr');
    await this.bankCode.fill(uniqueBankCode);

    // Add Bank Branch
    await expect(this.addBankBranchBtn).toBeEnabled();
    await this.addBankBranchBtn.click();
    await this.page.locator('.p-dialog:visible').waitFor({ state: 'visible' });

    // Branch Name
    await this.branchName.fill('Nasr City');

    // Branch Code
    await this.branchCode.fill(uniqueBranchCode);

    // Country
    await this.country.click();
    await this.page.locator('.p-select-overlay .p-select-option').first().waitFor({ state: 'visible' });
    await this.page.locator('.p-select-overlay .p-select-option').first().click();

    // City
    await this.city.click();
    await this.page.locator('.p-select-overlay .p-select-option').first().waitFor({ state: 'visible' });
    await this.page.locator('.p-select-overlay .p-select-option').first().click();

    // District
    await this.district.click();
    await this.page.locator('.p-select-overlay .p-select-option').first().waitFor({ state: 'visible' });
    await this.page.locator('.p-select-overlay .p-select-option').first().click();

    // Address
    await this.address.fill(
      'Mohamed Ali 15 El Galaa Street Shebin El Kom, Menoufia 32511 EGYPT'
    );

    // Mobile Number
    await this.mobileNumber.fill('01034567898');

    // Email
    await this.email.fill('bankmisr@gmail.com');

    // Save Branch
    await expect(this.saveBranchBtn).toBeEnabled();
    await this.saveBranchBtn.click();

    await this.page.locator('.p-dialog').waitFor({ state: 'hidden' });

    await this.waitForLoader();

    // Edit Bank
    await expect(this.editBankBtn).toBeEnabled();
    await this.editBankBtn.click();

    await this.waitForLoader();
  }
}
