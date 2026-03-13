import { expect, type Locator, type Page } from '@playwright/test';

export class PendingPurchaseRequestPage {

  readonly page: Page;
  readonly supplyChain_btn: Locator;
  readonly purchasing_btn: Locator;
  readonly operationsmenu_btn: Locator;
  readonly pendingPurchaseRequests_menu: Locator;
  readonly create_btn: Locator;

  readonly url: string = 'https://test.actorserp.com/zeta';

  constructor(page: Page) {

    this.page = page;

    this.supplyChain_btn = page.getByText('Supply Chain');

    this.purchasing_btn = page.getByText('Purchasing');

    this.operationsmenu_btn = page.getByText('Operations');

    this.pendingPurchaseRequests_menu = page.getByRole('link', {
      name: 'Pending Purchase Requests',
      exact: true
    });

    this.create_btn = page.getByRole('button', { name: 'Create' });

  }

  async goto() {

    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });

  }

  async navigateToPendingPurchaseRequests() {

    await this.supplyChain_btn.click();
    await this.purchasing_btn.click();
    await this.operationsmenu_btn.click();
    await this.pendingPurchaseRequests_menu.click();

  }

  async verifyNavigationToManagePendingPurchaseRequests() {

    await expect(this.page).toHaveURL(/pending-purchase-requests/);


  }

}