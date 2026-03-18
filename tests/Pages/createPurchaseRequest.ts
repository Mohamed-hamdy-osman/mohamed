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

    // Header dropdowns
    this.branch_dropdown = page.getByRole('combobox').nth(0);
    this.requester_dropdown = page.getByRole('combobox').nth(1);
    this.financialPeriod_dropdown = page.getByRole('combobox').nth(2);

    this.addLine_btn = page.getByRole('button', { name: 'Add Line' });

    // Item Line dropdowns
    this.type_dropdown = page.getByRole('combobox').nth(3);
    this.group_dropdown = page.getByRole('combobox').nth(4);
    this.subGroup_dropdown = page.getByRole('combobox').nth(5);
    this.item_dropdown = page.getByRole('combobox').nth(6);
    this.uom_dropdown = page.getByRole('combobox').nth(7);

    // Cost center يظهر بعد UOM
this.costCenter_dropdown = page.getByRole('combobox').nth(8);
    // Service fields
    this.serviceName_dropdown = page.getByRole('combobox').nth(4);
   this.description_textbox = page.locator("textarea[placeholder='Description']").first();
    // Inputs
    this.quantity_textbox = page.getByPlaceholder('Enter Quantity');
    this.unitPrice_textbox = page.getByPlaceholder('Enter Unit Price');

    // Buttons
    this.saveLine_btn = page.getByRole('button', { name: 'Save', exact: true });
    this.submit_btn = page.getByRole('button', { name: 'Submit', exact: true });

  }

  async selectOption(dropdown: Locator, index: number) {

    await dropdown.click();

    const panel = this.page.locator('.p-overlay:visible').last();

    await panel.waitFor({ state: 'visible' });

    const options = panel.locator('.p-select-option');

    await options.first().waitFor({ state: 'visible' });

    await options.nth(index).click();

  }

  async fillRequiredFields() {

    await this.selectOption(this.branch_dropdown, 0);
    await this.selectOption(this.requester_dropdown, 0);
    await this.selectOption(this.financialPeriod_dropdown, 0);

  }

  async addPurchaseLine() {

    await expect(this.addLine_btn).toBeEnabled();

    await this.addLine_btn.click();

    await this.type_dropdown.waitFor({ state: 'visible' });

  }

  async fillPurchaseLine(line: any) {

    // Select Type
    await this.selectOption(this.type_dropdown, line.typeIndex);

    // Service Line
    if (line.isService) {

      await this.selectOption(this.serviceName_dropdown, 0);

      await this.description_textbox.fill('service');

      await this.selectOption(this.costCenter_dropdown, 0);

      await this.unitPrice_textbox.fill('100');

    }

    // Item Line
    else {

      await this.selectOption(this.group_dropdown, line.groupIndex);

      await this.selectOption(this.subGroup_dropdown, line.subGroupIndex);

      await this.selectOption(this.item_dropdown, line.itemIndex);

      await this.selectOption(this.uom_dropdown, line.uomIndex);

      // Cost center يظهر فقط لبعض lines
      if (line.withCostCenter) {

        await this.selectOption(this.costCenter_dropdown, 0);

      }
  

      await this.quantity_textbox.fill(line.quantity);

      await this.unitPrice_textbox.fill(line.price);

    }

  }

  async saveLine() {

    await expect(this.saveLine_btn).toBeEnabled();

    await this.saveLine_btn.click();

  }

  async addMultiplePurchaseLines(lines: any[]) {

    for (const line of lines) {

      await this.addPurchaseLine();

      await this.fillPurchaseLine(line);

      await this.saveLine();

    }

  }

async submitPurchaseRequest() {

  await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });

  const submitBtn = this.page.getByRole('button', { name: 'Submit' });

  await expect(submitBtn).toBeVisible();
  await expect(submitBtn).toBeEnabled();

  await submitBtn.click();

  await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  await expect(this.page.getByText('Purchase Request Submitted Successfully')).toBeVisible();}
}