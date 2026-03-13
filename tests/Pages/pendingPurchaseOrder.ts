import { expect, type Locator, type Page } from '@playwright/test';

export class PendingPurchaseOrderPage {

  readonly page: Page;

  readonly supplyChain_btn: Locator;
  readonly purchasing_btn: Locator;
  readonly operationsmenu_btn: Locator;
  readonly pendingPurchaseOrder_menu: Locator;

  constructor(page: Page) {

    this.page = page;

    this.supplyChain_btn = page.getByText('Supply Chain');

    this.purchasing_btn = page.getByText('Purchasing', { exact: true });

    this.operationsmenu_btn = page.getByText('Operations', { exact: true });

    this.pendingPurchaseOrder_menu = page.getByText('Pending Purchase Order');

  }

  async navigateToPendingPurchaseOrders() {

    // انتظار ظهور Supply Chain بعد login
    await this.page.waitForSelector('text=Supply Chain', { timeout: 20000 });

    // الدخول إلى module
    await this.supplyChain_btn.click();

    // انتظار ظهور Purchasing
    await this.purchasing_btn.waitFor({ state: 'visible' });

    await this.purchasing_btn.click();

    // انتظار Operations
    await this.operationsmenu_btn.waitFor({ state: 'visible' });

    await this.operationsmenu_btn.click();

    // فتح Pending Purchase Orders
    await this.pendingPurchaseOrder_menu.waitFor({ state: 'visible' });

    await this.pendingPurchaseOrder_menu.click();

    // التأكد من فتح الصفحة
    await expect(this.page).toHaveURL(/pending-purchase-order/);

  }
    async verifyNavigationToManagePendingPurchaseOrders() {

    await expect(this.page).toHaveURL(/pending-purchase-order/);

  }

}