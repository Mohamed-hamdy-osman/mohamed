import { expect, type Locator, type Page } from '@playwright/test';

export class PendingPurchaseOrderPage {

  readonly page: Page;

  readonly supplyChain_btn: Locator;
  readonly purchasing_btn: Locator;
  readonly operationsmenu_btn: Locator;
  readonly pendingPurchaseOrders_menu: Locator;
  readonly firstRow: Locator;
  readonly view_btn: Locator;
  readonly approve_btn: Locator;
  readonly reject_btn: Locator;
  readonly return_btn: Locator;
  readonly reject_reason: Locator;
  readonly return_reason: Locator;
  readonly rejectReason_btn: Locator;
  readonly returnReason_btn: Locator;
  readonly approvedNotification: Locator;
  readonly rejectedNotification: Locator;
  readonly returnedNotification: Locator;

  constructor(page: Page) {
    this.page = page;
    this.supplyChain_btn = page.getByText('Supply Chain');
    this.purchasing_btn = page.getByText('Purchasing');
    this.operationsmenu_btn = page.getByText('Operations');
    this.pendingPurchaseOrders_menu = page.getByRole('link', {
      name: 'Pending Purchase Order',
      exact: true
    });

    this.firstRow = page.locator('tbody tr').first();
    this.view_btn = this.firstRow.locator('button').first();
    this.approve_btn = page.getByRole('button', { name: 'Approve' });
    this.reject_btn = page.getByRole('button', { name: 'Reject' });
    this.return_btn = page.getByRole('button', { name: 'Return' });
    this.reject_reason = page.locator('textarea[placeholder="Rejection Reason"]:visible');
    this.return_reason = page.locator('textarea[placeholder="Return Reason"]:visible');
    this.rejectReason_btn = page.getByRole('button', { name: 'Reject' }).last();
    this.returnReason_btn = page.getByRole('button', { name: 'Return' }).last();
    this.approvedNotification = page.getByText('Purchase Order Approved Successfully');
    this.rejectedNotification = page.getByText('Purchase Order Rejected Successfully');
    this.returnedNotification = page.getByText('Purchase Order Returned Successfully');
  }

  async navigateToPendingPurchaseOrders() {
    await expect(this.supplyChain_btn).toBeVisible({ timeout: 15000 });
    if (!(await this.purchasing_btn.isVisible())) {
      await this.supplyChain_btn.click();
    }

    await expect(this.purchasing_btn).toBeVisible({ timeout: 15000 });
    if (!(await this.operationsmenu_btn.isVisible())) {
      await this.purchasing_btn.click();
    }

    await expect(this.operationsmenu_btn).toBeVisible({ timeout: 15000 });
    await this.operationsmenu_btn.click();
    await expect(this.pendingPurchaseOrders_menu).toBeVisible({ timeout: 15000 });
    await Promise.all([
      this.page.waitForURL(/pending-purchase-order/),
      this.pendingPurchaseOrders_menu.click()
    ]);
  }

  async verifyNavigationToManagePendingPurchaseOrders() {
    await expect(this.page).toHaveURL(/pending-purchase-order/);
    await expect(this.firstRow).toBeVisible({ timeout: 15000 });
  }

  async approvePurchaseOrder() {
    await expect(this.firstRow).toBeVisible();
    await this.view_btn.click();
    await expect(this.approve_btn).toBeVisible();
    await this.approve_btn.click();

    const confirmBtn = this.page.getByRole('button', { name: /yes|confirm/i });

    if (await confirmBtn.isVisible()) {
      await confirmBtn.click();
    }

    await this.page.waitForURL(/pending-purchase-order/);
    await expect(this.approvedNotification).toBeVisible({ timeout: 10000 });
  }

  async rejectPurchaseOrder() {
    await expect(this.firstRow).toBeVisible();
    await this.view_btn.click();
    await this.reject_btn.first().click();
    await expect(this.reject_reason).toBeVisible();
    await this.reject_reason.fill('Not needed at the moment');
    await this.rejectReason_btn.click();
    await expect(this.rejectedNotification).toBeVisible({ timeout: 10000 });
  }

  async returnPurchaseOrder() {
    await expect(this.firstRow).toBeVisible();
    await this.view_btn.click();
    await this.return_btn.first().click();
    await expect(this.return_reason).toBeVisible();
    await this.return_reason.fill('Need more information');
    await this.returnReason_btn.click();
    await expect(this.returnedNotification).toBeVisible({ timeout: 10000 });
  }
}