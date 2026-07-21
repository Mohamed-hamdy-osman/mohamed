import { expect, type Locator, type Page } from '@playwright/test';

export class ManageCheckOnHandPage {

  readonly page: Page;

  readonly logToCorporate_btn: Locator;
  readonly supplyChain_btn: Locator;
  readonly inventory_btn: Locator;
  readonly operationsmenu_btn: Locator;
  readonly checkOnHand_menu: Locator;
  readonly check_btn: Locator;

  constructor(page: Page) {

    this.page = page;

    this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).first();
    this.supplyChain_btn = page.getByText('Supply Chain');
    this.inventory_btn = page.getByText('Inventory');
    this.operationsmenu_btn = page.getByText('Operations');
    this.checkOnHand_menu = page.getByRole('link', {
      name: 'Check-On Hand',
      exact: true
    });
    this.check_btn = page.getByRole('button', { name: 'Check' });

   
    }
    async waitForLoader() {
      await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
    }

    async navigateToCheckOnHand() {
      await this.waitForLoader();
      await this.logToCorporate_btn.click();
      await this.waitForLoader();
      await this.supplyChain_btn.click();

      await this.inventory_btn.click();

      await this.operationsmenu_btn.waitFor({ state: 'visible' });

      await this.operationsmenu_btn.click();

      await Promise.all([
        this.page.waitForURL(/check-on-hand/),
        this.checkOnHand_menu.click()
      ]);
    }

    async clickCheckButton() {
      await this.check_btn.click();
    }

  

  
}