import { expect, type Locator, type Page } from '@playwright/test';

export class ManageJournalEntryPage {

  readonly page: Page;

  readonly logToCorporate_btn: Locator;
  readonly financeMenu: Locator;
  readonly generalLedgerMenu: Locator;
  readonly operationsMenu: Locator;
  readonly journalEntryOption: Locator;
  readonly manageJournalEntryHeader: Locator;
  readonly addJournalEntry_btn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).last();
    this.financeMenu = page.getByText('Finance');
    this.generalLedgerMenu = page.getByText('General Ledger');
    this.operationsMenu = page.getByText('Operations');
    this.journalEntryOption = page.getByText('Journal Entries');
    this.manageJournalEntryHeader = page.locator('text=Journal Entries').first();
    this.addJournalEntry_btn = page.getByRole('button', { name: 'Add Journal Entry' });
  }

  async waitForLoader() {
    await this.page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
  }

  async navigateToManageJournalEntry() {

    await this.waitForLoader();
    await this.logToCorporate_btn.click();
    await this.waitForLoader();

    await this.financeMenu.click();
    await this.waitForLoader();
    await this.generalLedgerMenu.click();
    await this.waitForLoader();
    await this.operationsMenu.waitFor({ state: 'visible' });
    await this.operationsMenu.click();
    await this.journalEntryOption.waitFor({ state: 'visible' });

    await Promise.all([
      this.page.waitForURL(/journal-entry/),
      this.journalEntryOption.click()
    ]);

    await this.waitForLoader();
    await this.addJournalEntry_btn.waitFor({ state: 'visible' });
  }

  async verifyNavigationToManageJournalEntry() {
    await this.waitForLoader();
    await expect(this.page).toHaveURL(/journal-entry/);
    await expect(this.manageJournalEntryHeader).toBeVisible();
    await expect(this.addJournalEntry_btn).toBeVisible();
  }

}