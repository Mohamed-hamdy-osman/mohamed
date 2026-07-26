import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object for the "Create Order Type" multi-step dialog.
 * Covers: Basic Info step -> Workflow step -> Confirmation/Pick Release step.
 * Variant: Auto Transaction (Pick Release = Auto Transaction) + Allow Partial Confirmation.
 */
export class autoTransactAllowPartialOrderTypePage {
  readonly page: Page;

  // Entry point
  readonly addButton: Locator;

  // --- Step 1: Basic Info dialog ---
  readonly dialog: Locator;
  readonly nameInput: Locator;
  readonly invoiceTypeDropdown: Locator;
  readonly branchDropdown: Locator;
  readonly salesOrderRadio: Locator;
  readonly returnOrderRadio: Locator;
  readonly inventoryItemRadio: Locator;
  readonly nonInventoryItemRadio: Locator;
  readonly bothItemTypeRadio: Locator;
  readonly generateWorkOrderYesRadio: Locator;
  readonly generateWorkOrderNoRadio: Locator;
  readonly automaticClosedYesRadio: Locator;
  readonly automaticClosedNoRadio: Locator;
  readonly nextButtonStep1: Locator;

  // --- Step 2: Workflow selection ---
  readonly workflowTitle: Locator;
  readonly workflowSimpleOption: Locator; // Creation/Confirmation/Allocation/Shipping
  readonly workflowPickReleaseOption: Locator; // Creation/Confirmation/Pick Release/Picking/Shipping
  readonly nextButtonStep2: Locator;
  readonly backButtonStep2: Locator;

  // --- Step 3: Confirmation / Pick Release settings ---
  readonly autoConfirmationRadio: Locator;
  readonly manualConfirmationRadio: Locator;
  readonly allowPartialConfirmationCheckbox: Locator;
  readonly defaultMoveOrderTransactionDropdown: Locator;
  readonly manualAllocationRadio: Locator;
  readonly autoTransactionRadio: Locator;
  readonly shippingStoreDropdown: Locator;
  readonly shippingStoreLocatorDropdown: Locator;
  readonly qtyRestrictedYesRadio: Locator;
  readonly qtyRestrictedNoRadio: Locator;
  readonly requireDeliveryYesRadio: Locator;
  readonly requireDeliveryNoRadio: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.addButton = page.getByRole('button', { name: 'Add' });

    this.dialog = page.getByRole('dialog', { name: 'Create Order Type' });
    this.nameInput = this.dialog.locator('#name');
    this.invoiceTypeDropdown = this.dialog.locator('#invoiceType');
    this.branchDropdown = this.dialog.locator('#branchId');
    this.salesOrderRadio = this.dialog.locator('#nature_Sales');
    this.returnOrderRadio = this.dialog.locator('#nature_Return');
    this.inventoryItemRadio = this.dialog.locator('#itemType_InventoryItem');
    this.nonInventoryItemRadio = this.dialog.locator('#itemType_NonInventoryItem');
    this.bothItemTypeRadio = this.dialog.locator('#itemType_Both');
    this.generateWorkOrderYesRadio = this.dialog.locator('#gwo_true');
    this.generateWorkOrderNoRadio = this.dialog.locator('#gwo_false');
    this.automaticClosedYesRadio = this.dialog.locator('#automaticClosed_yes');
    this.automaticClosedNoRadio = this.dialog.locator('#automaticClosed_no');
    this.nextButtonStep1 = this.dialog.getByRole('button', { name: 'Next' });

    this.workflowTitle = page.getByText('Workflow', { exact: true });
    this.workflowSimpleOption = page.getByText(
      'Creation / Confirmation / Allocation / Shipping'
    );
    this.workflowPickReleaseOption = page.getByText(
      'Creation / Confirmation / Pick Release / Picking / Shipping'
    );
    this.nextButtonStep2 = this.dialog.getByRole('button', { name: 'Next', exact: true });
    this.backButtonStep2 = this.dialog.getByRole('button', { name: 'Back', exact: true });

    this.autoConfirmationRadio = page.locator('#autoConfirmation');
    this.manualConfirmationRadio = page.locator('#manualConfirmation'); // adjust id if different
    this.allowPartialConfirmationCheckbox = page.locator('#allowPartialConfirmation');
    this.defaultMoveOrderTransactionDropdown = page.locator(
      '#defaultMoveOrderTransactionId'
    );
    this.manualAllocationRadio = this.dialog.getByRole('radio', { name: 'Manual Allocation', exact: true });
    this.autoTransactionRadio = this.dialog.getByRole('radio', { name: 'Auto Transaction', exact: true });
    this.shippingStoreDropdown = this.dialog.getByRole('combobox', { name: 'Shipping Store' });
    this.shippingStoreLocatorDropdown = this.dialog.getByRole('combobox', { name: 'Shipping Store Locator' });
    this.qtyRestrictedYesRadio = page.locator('#qty_true');
    this.qtyRestrictedNoRadio = page.locator('#qty_false');
    this.requireDeliveryYesRadio = page.locator('#delivery_true');
    this.requireDeliveryNoRadio = page.locator('#delivery_false');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  // --- Actions ---

  async open() {
    await this.addButton.click();
    await expect(this.dialog).toBeVisible();
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
  }

  /** Generates a name like "Auto Transact 482" */
  static generateOrderName(prefix = 'Auto Transact'): string {
    const uniqueId = Math.floor(100 + Math.random() * 900);
    return `${prefix} ${uniqueId}`;
  }

  async selectFirstInvoiceType() {
    await this.invoiceTypeDropdown.click();
    await this.page.locator('#invoiceType_list li').first().click();
  }

  async selectBranch(branchName: string) {
    await this.branchDropdown.click();
    const overlay = this.page.locator('.p-select-overlay, .p-overlay').last();
    const filterInput = overlay.locator('input[type="text"]');
    if (await filterInput.count()) {
      await filterInput.fill(branchName);
    }
    await this.page.getByRole('option', { name: branchName }).click();
  }

  async selectSalesOrder() {
    await this.salesOrderRadio.click({ force: true });
  }

  async selectInventoryItem() {
    await this.inventoryItemRadio.click({ force: true });
  }

  async selectGenerateWorkOrder(value: 'yes' | 'no') {
    const radio =
      value === 'yes' ? this.generateWorkOrderYesRadio : this.generateWorkOrderNoRadio;
    await radio.click({ force: true });
  }

  async selectAutomaticClosed(value: 'yes' | 'no') {
    const radio =
      value === 'yes' ? this.automaticClosedYesRadio : this.automaticClosedNoRadio;
    await radio.click({ force: true });
  }

  async goToNextStep1() {
    await expect(this.nextButtonStep1).toBeEnabled();
    await this.nextButtonStep1.click();
  }

  async selectWorkflowPickRelease() {
    await expect(this.workflowTitle).toBeVisible();
    await this.workflowPickReleaseOption.click();
  }

  async goToNextStep2() {
    await expect(this.nextButtonStep2).toBeEnabled();
    await this.nextButtonStep2.click();
  }

  async selectAutoConfirmation() {
    await expect(this.autoConfirmationRadio).toBeVisible();
    await this.autoConfirmationRadio.click({ force: true });
  }

  /** Checks the "Allow Partial Confirmation" checkbox only (does not uncheck if already checked) */
  async checkAllowPartialConfirmation() {
    await expect(this.allowPartialConfirmationCheckbox).toBeVisible();
    if (!(await this.allowPartialConfirmationCheckbox.isChecked())) {
      await this.allowPartialConfirmationCheckbox.click({ force: true });
    }
  }

  async selectFirstMoveOrderTransaction() {
    await this.defaultMoveOrderTransactionDropdown.click();
    await this.page
      .locator('[id^="defaultMoveOrderTransactionId_list"] li')
      .first()
      .click();
  }

  async selectAutoTransaction() {
    await this.autoTransactionRadio.click();
  }

  async selectFirstShippingStore() {
    await this.shippingStoreDropdown.click();
    await this.page.locator('.p-select-overlay li, .p-overlay li').first().click();
  }

  async selectFirstShippingStoreLocator() {
    await this.shippingStoreLocatorDropdown.click();
    await this.page.locator('.p-select-overlay li, .p-overlay li').first().click();
  }

  async selectQtyRestricted(value: 'yes' | 'no') {
    const radio = value === 'yes' ? this.qtyRestrictedYesRadio : this.qtyRestrictedNoRadio;
    await radio.click({ force: true });
  }

  async selectRequireDelivery(value: 'yes' | 'no') {
    const radio =
      value === 'yes' ? this.requireDeliveryYesRadio : this.requireDeliveryNoRadio;
    await radio.click({ force: true });
  }

  async save() {
    await expect(this.saveButton).toBeEnabled();
    await this.saveButton.click();
  }

  /** Full "auto transaction" happy-path flow, returns the generated order name */
  async createAutoTransactAllowPartialOrderType(branchName = 'Cairo Branch'): Promise<string> {
    const orderName = autoTransactAllowPartialOrderTypePage.generateOrderName();

    await this.open();
    await this.fillName(orderName);
    await this.selectFirstInvoiceType();
    await this.selectBranch(branchName);
    await this.selectSalesOrder();
    await this.selectInventoryItem();
    await this.selectGenerateWorkOrder('yes');
    await this.selectAutomaticClosed('no');
    await this.goToNextStep1();

    await this.selectWorkflowPickRelease();
    await this.goToNextStep2();

    await this.selectAutoConfirmation();
    await this.checkAllowPartialConfirmation();
    await this.selectFirstMoveOrderTransaction();
    await this.selectAutoTransaction();
    await this.selectFirstShippingStore();
    await this.selectFirstShippingStoreLocator();
    await this.selectQtyRestricted('no');
    await this.selectRequireDelivery('no');
    await this.save();

    return orderName;
  }
}