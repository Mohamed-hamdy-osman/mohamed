import { expect, type Locator, type Page } from '@playwright/test';
import { assert } from 'console';

export class ViewSafesPage {

  readonly page: Page;
  readonly viewBtn: Locator;
  readonly viewSafesHeader: Locator;


  constructor(page: Page) {
    this.page = page;
    this.viewBtn = page.locator('button:has(i.ki-eye)').first();
    this.viewSafesHeader = page.locator('text=View Safes').first();
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  }

async navigateToViewSafes() {
  await this.waitForLoader();

  await this.viewBtn.waitFor({ state: 'visible' });
  await this.viewBtn.click();

  await this.waitForLoader();

  await expect(this.viewSafesHeader).toBeVisible();
}

}