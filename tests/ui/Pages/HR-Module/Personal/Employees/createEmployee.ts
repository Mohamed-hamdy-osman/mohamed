import { expect, type Locator, type Page, test } from '@playwright/test';

export class CreateEmployeePage {
  readonly page: Page;

  // Top level fields
  readonly firstName_textbox: Locator;
  readonly secondName_textbox: Locator;
  readonly thirdName_textbox: Locator;
  readonly lastName_textbox: Locator;
  readonly save_btn: Locator;

  // Tabs
  readonly contract_tab: Locator;
  readonly contactInfo_tab: Locator;
  readonly personalData_tab: Locator;
  readonly workInfo_tab: Locator;
  readonly commitment_tab: Locator;

  constructor(page: Page) {
    this.page = page;

    // Base details
    this.firstName_textbox = page.getByPlaceholder(/First Name/i);
    this.secondName_textbox = page.getByPlaceholder(/Second Name/i);
    this.thirdName_textbox = page.getByPlaceholder(/Third Name/i);
    this.lastName_textbox = page.getByPlaceholder(/Last Name/i);
    this.save_btn = page.getByRole('button', { name: 'Save' });

    // Tabs
    this.contract_tab = page.getByRole('tab', { name: 'Contract' });
    this.contactInfo_tab = page.getByRole('tab', { name: 'Contact Info' });
    this.personalData_tab = page.getByRole('tab', { name: 'Personal Data' });
    this.workInfo_tab = page.getByRole('tab', { name: 'Work Info' });
    this.commitment_tab = page.getByRole('tab', { name: 'Commitment' });
  }

  // Helper to select a generic dropdown
  async selectDropdown(locator: Locator, index: number = 0) {
    await locator.click();
    await this.page.waitForTimeout(500);
    const panel = this.page.locator('.p-dropdown-panel, .p-overlay').last();
    await panel.waitFor({ state: 'visible', timeout: 5000 });
    const items = panel.locator('li.p-dropdown-item');
    if (await items.count() > index) {
        await items.nth(index).click();
    } else {
        await this.page.keyboard.press('Escape'); // fallback
    }
    await this.page.waitForTimeout(500);
  }

  // Helper to pick today's date from a calendar
  async selectTodayDate(locator: Locator) {
    await locator.click();
    await this.page.waitForTimeout(500);
    const today = this.page.locator('td.p-datepicker-today');
    if (await today.count() > 0) {
        await today.first().click();
    } else {
        await this.page.keyboard.press('Enter');
    }
    await this.page.waitForTimeout(500);
  }

  async fillEmployeeDetails(details: any) {
    await test.step('Fill Employee Base Name Details', async () => {
      await this.firstName_textbox.fill(details.firstName);
      await this.secondName_textbox.fill(details.secondName);
      await this.thirdName_textbox.fill(details.thirdName);
      await this.lastName_textbox.fill(details.lastName);
    });

    await test.step('Fill Contract Tab', async () => {
      await this.contract_tab.click();
      await this.page.waitForTimeout(500);
      
      const contractPanel = this.page.getByRole('tabpanel', { name: 'Contract' });
      await this.selectDropdown(contractPanel.getByRole('combobox', { name: /Select Contract Type/i }));
      await this.selectDropdown(contractPanel.getByRole('combobox', { name: /Select Work Model/i }));
      
      await this.selectTodayDate(contractPanel.getByRole('combobox', { name: 'Contract Start Date' }));
      await this.selectTodayDate(contractPanel.getByRole('combobox', { name: 'Contract End Date' }));
      await this.selectTodayDate(contractPanel.getByRole('combobox', { name: 'Contract Actual Start Date' }));
      
      await contractPanel.getByRole('textbox', { name: /Enter Contract Salary/i }).fill(details.salary || '5000');
    });

    await test.step('Fill Contact Info Tab', async () => {
      await this.contactInfo_tab.click();
      await this.page.waitForTimeout(500);

      const contactPanel = this.page.getByRole('tabpanel', { name: 'Contact Info' });
      await contactPanel.getByRole('textbox', { name: /Enter Employee Mobile Number/i }).fill(details.mobile || '01012345678');
      await contactPanel.getByRole('textbox', { name: /Enter Employee Email/i }).fill(details.email || 'emp@test.com');
    });

    await test.step('Fill Personal Data Tab', async () => {
      await this.personalData_tab.click();
      await this.page.waitForTimeout(500);

      const personalPanel = this.page.getByRole('tabpanel', { name: 'Personal Data' });
      await this.selectDropdown(personalPanel.getByRole('combobox', { name: /Select Employee Nationality/i }));
      await personalPanel.getByRole('textbox', { name: /Enter Employee National ID/i }).fill(details.nationalId || '12345678901234');
      await this.selectTodayDate(personalPanel.getByRole('combobox', { name: /Enter ID \/ Passport Expiry Date/i }));
      await this.selectDropdown(personalPanel.getByRole('combobox', { name: /Select Identity Type/i }));
      
      await this.selectDropdown(personalPanel.getByRole('combobox', { name: /Select Employee Religion/i }));
      await this.selectTodayDate(personalPanel.getByRole('combobox', { name: /Enter Date Of Birth/i }));
      await this.selectDropdown(personalPanel.getByRole('combobox', { name: /Select Employee Marital Status/i }));
      await this.selectDropdown(personalPanel.getByRole('combobox', { name: /Select Employee Gender/i }));
      await this.selectDropdown(personalPanel.getByRole('combobox', { name: /Select Employee Military Status/i }));

      // Education
      await this.selectDropdown(personalPanel.getByRole('textbox', { name: /Enter \/ Select Faculty/i }).locator('..').getByRole('button', { name: 'dropdown trigger' }));
      await this.selectDropdown(personalPanel.getByRole('textbox', { name: /Enter \/ Select Major/i }).locator('..').getByRole('button', { name: 'dropdown trigger' }));
      await this.selectDropdown(personalPanel.getByRole('textbox', { name: /Enter \/ Select University/i }).locator('..').getByRole('button', { name: 'dropdown trigger' }));
      await this.selectDropdown(personalPanel.getByRole('combobox', { name: /Enter \/ Select Degree/i }));
      await personalPanel.getByRole('combobox', { name: /Enter Graduation Year/i }).fill('2015');
      await this.page.keyboard.press('Escape');
    });

    await test.step('Fill Work Info Tab', async () => {
      await this.workInfo_tab.click();
      await this.page.waitForTimeout(500);

      const workPanel = this.page.getByRole('tabpanel', { name: 'Work Info' });
      await workPanel.getByRole('textbox', { name: /Insurance Wage/i }).fill('2000');
      await this.selectDropdown(workPanel.getByRole('combobox', { name: /Select Work Regulation/i }));
      await this.selectDropdown(workPanel.getByRole('combobox', { name: /Select Shifts/i }));
      await this.selectTodayDate(workPanel.getByRole('combobox', { name: 'Start Date' }));
    });

    await test.step('Fill Commitment Tab', async () => {
      await this.commitment_tab.click();
      await this.page.waitForTimeout(500);

      const commitPanel = this.page.getByRole('tabpanel', { name: 'Commitment' });
      await commitPanel.getByRole('textbox', { name: /Enter Previous Insurance Duration/i }).fill('2');
      await this.selectTodayDate(commitPanel.getByRole('combobox', { name: 'Insurance Start Date' }));
      await commitPanel.getByRole('textbox', { name: /Enter Employee Insurance Number/i }).fill('987654321');
    });
  }

  async saveEmployee() {
    await test.step('Saving the employee', async () => {
      await this.save_btn.click();
      // Wait for navigation or success message
      await this.page.waitForURL(/employees/, { timeout: 15000 });
    });
  }
}
