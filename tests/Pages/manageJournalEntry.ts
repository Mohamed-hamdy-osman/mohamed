import { expect, type Locator, type Page } from '@playwright/test';

export class ManageJournalEntryPage {

  readonly page: Page;
  readonly financeMenu: Locator;
  readonly generalLedgerMenu: Locator;
  readonly optionslist: Locator;
  readonly journalEntryOption: Locator;
  readonly manageJournalEntryHeader: Locator;
    
  constructor(page: Page) {
    this.page = page;

    this.financeMenu = page.locator('a[title="Finance"]');
    this.generalLedgerMenu = page.locator('a[title="General Ledger"]');
    this.optionslist = page.locator('.ms-ContextualMenu-list');
    this.journalEntryOption = this.optionslist.locator('li:has-text("Journal Entries")');
    this.manageJournalEntryHeader = page.locator('h1:has-text("Journal Entries")');
  }

  // ✅ حل مشكلة loader
  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  }

  async navigateToManageJournalEntry() {

    await this.waitForLoader();
    await this.financeMenu.click();

    await this.waitForLoader();
    await this.generalLedgerMenu.click();

    await this.journalEntryOption.waitFor({ state: 'visible' });

    await Promise.all([
      this.page.waitForURL(/journal-entry/),
      this.journalEntryOption.click()
    ]);

  }

  async verifyNavigationToManageJournalEntry() {

    await this.waitForLoader();

    await expect(this.manageJournalEntryHeader).toBeVisible();

  }

}