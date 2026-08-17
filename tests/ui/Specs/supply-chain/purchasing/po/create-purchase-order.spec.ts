import { test, expect } from '@playwright/test';
import { ManagePurchaseOrderPage } from '../../../../Pages/supply-chain/purchasing/po/manage-purchase-order';
import { CreatePurchaseOrderPage } from '../../../../Pages/supply-chain/purchasing/po/create-purchase-order';
let managePurchaseOrderPage!: ManagePurchaseOrderPage;
let createPurchaseOrderPage!: CreatePurchaseOrderPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
    managePurchaseOrderPage = new ManagePurchaseOrderPage(page);
    createPurchaseOrderPage = new CreatePurchaseOrderPage(page);
    await page.goto('/zeta/choose-module');
await page.waitForLoadState('load');
    console.log(`Test start: ${testInfo.title}`);
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
});

test.afterEach(async ({ page }, testInfo) => {
    await page.goto('/zeta/choose-module');
    await page.waitForLoadState('load');
    console.log(`Test end: ${testInfo.title}`);
});

test('Verify Create Purchase Order with Multiple Lines', async ({ page }) => {
    await managePurchaseOrderPage.navigateToPurchaseOrders();
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
    await expect(managePurchaseOrderPage.create_btn).toBeVisible({ timeout: 15000 });
    await managePurchaseOrderPage.create_btn.click();
    await expect(page).toHaveURL(/add-purchase-order/);
    await createPurchaseOrderPage.fillRequiredFields();
    await createPurchaseOrderPage.addMultiplePurchaseLines([
        {
            typeIndex: 0,
            groupIndex: 2,
            subGroupIndex: 1,
            itemIndex: 0,
            uomIndex: 0,
            quantity: '10',
            price: '100',
        },
        {
            typeIndex: 0,
            groupIndex: 2,
            subGroupIndex: 0,
            itemIndex: 0,
            uomIndex: 0,
            quantity: '10',
            price: '25',
        },
        {
            typeIndex: 0,
            groupIndex: 1,
            subGroupIndex: 0,
            itemIndex: 1,
            uomIndex: 0,
            quantity: '15',
            price: '30',
        },
    ]);
    await createPurchaseOrderPage.submitPurchaseOrder();
});

test('Verify Create Purchase Order Assets SubGroup1', async ({ page }) => {
    await managePurchaseOrderPage.navigateToPurchaseOrders();
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
    await expect(managePurchaseOrderPage.create_btn).toBeVisible({ timeout: 15000 });
    await managePurchaseOrderPage.create_btn.click();
    await expect(page).toHaveURL(/add-purchase-order/);
    await createPurchaseOrderPage.fillRequiredFields();
    await createPurchaseOrderPage.addMultiplePurchaseLines([
        {
            typeIndex: 0,
            groupIndex: 2,
            subGroupIndex: 1,
            itemIndex: 0,
            uomIndex: 0,
            quantity: '10',
            price: '100',
        },
    ]);
    await createPurchaseOrderPage.submitPurchaseOrder();
});

test('Verify Create Purchase Order Assets SubGroup', async ({ page }) => {
    await managePurchaseOrderPage.navigateToPurchaseOrders();
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
    await expect(managePurchaseOrderPage.create_btn).toBeVisible({ timeout: 15000 });
    await managePurchaseOrderPage.create_btn.click();
    await expect(page).toHaveURL(/add-purchase-order/);
    await createPurchaseOrderPage.fillRequiredFields();
    await createPurchaseOrderPage.addMultiplePurchaseLines([
        {
            typeIndex: 0,
            groupIndex: 2,
            subGroupIndex: 0,
            itemIndex: 0,
            uomIndex: 0,
            quantity: '10',
            price: '25',
        },
    ]);
    await createPurchaseOrderPage.submitPurchaseOrder();
});

test('Verify Create Purchase Order Expenses', async ({ page }) => {
    await managePurchaseOrderPage.navigateToPurchaseOrders();
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
    await expect(managePurchaseOrderPage.create_btn).toBeVisible({ timeout: 15000 });
    await managePurchaseOrderPage.create_btn.click();
    await expect(page).toHaveURL(/add-purchase-order/);
    await createPurchaseOrderPage.fillRequiredFields();
    await createPurchaseOrderPage.addMultiplePurchaseLines([
        {
            typeIndex: 0,
            groupIndex: 1,
            subGroupIndex: 0,
            itemIndex: 1,
            uomIndex: 0,
            quantity: '15',
            price: '30',
        },
    ]);
    await createPurchaseOrderPage.submitPurchaseOrder();
});
test.only('Verify Create Purchase Order Service Line Freight', async ({ page }) => {
    await managePurchaseOrderPage.navigateToPurchaseOrders();
    await managePurchaseOrderPage.create_btn.click();
    await createPurchaseOrderPage.fillRequiredFields();
    await createPurchaseOrderPage.addPurchaseLine();
    const dialog = page.locator('.p-dialog:visible');
    const type_dropdown = dialog.getByRole('combobox').nth(0);
    await createPurchaseOrderPage.selectOption(type_dropdown, 1);
    const serviceName_dropdown = dialog.getByRole('combobox').nth(2);
    await createPurchaseOrderPage.selectOptionBySearch(serviceName_dropdown, 'Freight');
    const description_input = dialog.locator(
        'input[placeholder*="escription"], textarea[placeholder*="escription"]'
    ).first();
    await description_input.waitFor({ state: 'visible' });
    await description_input.fill('Service');
    const costCenter_dropdown = dialog.getByRole('combobox').nth(1);
    await createPurchaseOrderPage.selectOption(costCenter_dropdown, 0);
    const unitPrice_input = dialog.getByPlaceholder('Enter Unit Price');
    await unitPrice_input.waitFor({ state: 'visible' });
    await unitPrice_input.fill('500');
    const saveLine_btn = dialog.getByRole('button', { name: 'Save', exact: true });
    await expect(saveLine_btn).toBeEnabled({ timeout: 10000 });
    await saveLine_btn.click();
    await page.locator('.p-dialog').waitFor({ state: 'hidden' });
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });
    const submit_btn = page.getByRole('button', { name: 'Submit', exact: true });
    await expect(submit_btn).toBeVisible({ timeout: 15000 });
    await expect(submit_btn).toBeEnabled({ timeout: 15000 });
    await expect(submit_btn).not.toHaveText('Save as Draft');
    await submit_btn.click();
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });
    await expect(page.getByText('Purchase Order Submitted Successfully')).toBeVisible({ timeout: 15000 });
});

test.only('Verify Create Purchase Order Service Lines Miscellaneous & Freight', async ({ page }) => {
    await managePurchaseOrderPage.navigateToPurchaseOrders();
    await managePurchaseOrderPage.create_btn.click();
    await createPurchaseOrderPage.fillRequiredFields();
    await createPurchaseOrderPage.addPurchaseLine();
    const dialog1 = page.locator('.p-dialog:visible');
    const type_dropdown1 = dialog1.getByRole('combobox').nth(0);
    await createPurchaseOrderPage.selectOption(type_dropdown1, 1);
    const serviceName_dropdown1 = dialog1.getByRole('combobox').nth(2);
    await createPurchaseOrderPage.selectOptionBySearch(serviceName_dropdown1, 'Freight');
    const description_input1 = dialog1.locator(
        'input[placeholder*="escription"], textarea[placeholder*="escription"]'
    ).first();
    await description_input1.waitFor({ state: 'visible' });
    await description_input1.fill('Service');
    const costCenter_dropdown1 = dialog1.getByRole('combobox').nth(1);
    await createPurchaseOrderPage.selectOption(costCenter_dropdown1, 0);
    const unitPrice_input1 = dialog1.getByPlaceholder('Enter Unit Price');
    await unitPrice_input1.waitFor({ state: 'visible' });
    await unitPrice_input1.fill('500');
    const saveLine_btn1 = dialog1.getByRole('button', { name: 'Save', exact: true });
    await expect(saveLine_btn1).toBeEnabled({ timeout: 10000 });
    await saveLine_btn1.click();
    await page.locator('.p-dialog').waitFor({ state: 'hidden' });
    await createPurchaseOrderPage.addPurchaseLine();
    const dialog2 = page.locator('.p-dialog:visible');
    const type_dropdown2 = dialog2.getByRole('combobox').nth(0);
    await createPurchaseOrderPage.selectOption(type_dropdown2, 1);
    const serviceName_dropdown2 = dialog2.getByRole('combobox').nth(2);
    await createPurchaseOrderPage.selectOptionBySearch(serviceName_dropdown2, 'Miscellane');
    const description_input2 = dialog2.locator(
        'input[placeholder*="escription"], textarea[placeholder*="escription"]'
    ).first();
    await description_input2.waitFor({ state: 'visible' });
    await description_input2.fill('Service');
    const costCenter_dropdown2 = dialog2.getByRole('combobox').nth(1);
    await createPurchaseOrderPage.selectOption(costCenter_dropdown2, 0);
    const unitPrice_input2 = dialog2.getByPlaceholder('Enter Unit Price');
    await unitPrice_input2.waitFor({ state: 'visible' });
    await unitPrice_input2.fill('500');
    const saveLine_btn2 = dialog2.getByRole('button', { name: 'Save', exact: true });
    await expect(saveLine_btn2).toBeEnabled({ timeout: 10000 });
    await saveLine_btn2.click();
    await page.locator('.p-dialog').waitFor({ state: 'hidden' });
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });
    const submit_btn = page.getByRole('button', { name: 'Submit', exact: true });
    await expect(submit_btn).toBeVisible({ timeout: 15000 });
    await expect(submit_btn).toBeEnabled({ timeout: 15000 });
    await expect(submit_btn).not.toHaveText('Save as Draft');
    await submit_btn.click();
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });
    await expect(page.getByText('Purchase Order Submitted Successfully')).toBeVisible({ timeout: 15000 });
});
test.only('Verify Create Purchase Order Service Line Miscellaneous', async ({ page }) => {
    await managePurchaseOrderPage.navigateToPurchaseOrders();
    await managePurchaseOrderPage.create_btn.click();
    await createPurchaseOrderPage.fillRequiredFields();
    await createPurchaseOrderPage.addPurchaseLine();
    const dialog = page.locator('.p-dialog:visible');
    const type_dropdown = dialog.getByRole('combobox').nth(0);
    await createPurchaseOrderPage.selectOption(type_dropdown, 1);
    const serviceName_dropdown = dialog.getByRole('combobox').nth(2);
    await createPurchaseOrderPage.selectOptionBySearch(serviceName_dropdown, 'Miscellane');
    const description_input = dialog.locator(
        'input[placeholder*="escription"], textarea[placeholder*="escription"]'
    ).first();
    await description_input.waitFor({ state: 'visible' });
    await description_input.fill('Service');
    const costCenter_dropdown = dialog.getByRole('combobox').nth(1);
    await createPurchaseOrderPage.selectOption(costCenter_dropdown, 0);
    const unitPrice_input = dialog.getByPlaceholder('Enter Unit Price');
    await unitPrice_input.waitFor({ state: 'visible' });
    await unitPrice_input.fill('500');
    const saveLine_btn = dialog.getByRole('button', { name: 'Save', exact: true });
    await expect(saveLine_btn).toBeEnabled({ timeout: 10000 });
    await saveLine_btn.click();
    await page.locator('.p-dialog').waitFor({ state: 'hidden' });
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });
    const submit_btn = page.getByRole('button', { name: 'Submit', exact: true });
    await expect(submit_btn).toBeVisible({ timeout: 15000 });
    await expect(submit_btn).toBeEnabled({ timeout: 15000 });
    await expect(submit_btn).not.toHaveText('Save as Draft');
    await submit_btn.click();
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });
    await expect(page.getByText('Purchase Order Submitted Successfully')).toBeVisible({ timeout: 15000 });
});
