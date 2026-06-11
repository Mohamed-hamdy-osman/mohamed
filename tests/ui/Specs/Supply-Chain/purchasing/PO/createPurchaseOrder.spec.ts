import { test, expect } from '@playwright/test';
import { ManagePurchaseOrderPage } from '../../../../Pages/Supply-Chain/Purchasing/PO/managePurchaseOrder';
import { CreatePurchaseOrderPage } from '../../../../Pages/Supply-Chain/Purchasing/PO/createPurchaseOrder';

let managePurchaseOrderPage!: ManagePurchaseOrderPage;
let createPurchaseOrderPage!: CreatePurchaseOrderPage;

test.setTimeout(180000);

test.beforeEach(async ({ page }, testInfo) => {
    managePurchaseOrderPage = new ManagePurchaseOrderPage(page);
    createPurchaseOrderPage = new CreatePurchaseOrderPage(page);
    await page.goto('/zeta');
    console.log(`Test start: ${testInfo.title}`);
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
});

test.afterEach(async ({ }, testInfo) => {
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

test('Verify Create Purchase Order Assets SubGroup0', async ({ page }) => {
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

// ✅ TEST 1: Miscellaneous
test.only('Verify Create Purchase Order Service Line Miscellaneous', async ({ page }) => {
    await managePurchaseOrderPage.navigateToPurchaseOrders();
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
    await expect(managePurchaseOrderPage.create_btn).toBeVisible({ timeout: 15000 });
    await managePurchaseOrderPage.create_btn.click();
    await expect(page).toHaveURL(/add-purchase-order/);

    // Step 1 & 2: Fill header fields
    await createPurchaseOrderPage.fillRequiredFields();

    // Step 3: Click Add Line
    await createPurchaseOrderPage.addPurchaseLine();

    const dialog = page.locator('.p-dialog:visible');

    // Step 4: Select Type as "Services"
    const type_dropdown = dialog.getByRole('combobox').nth(0);
    await createPurchaseOrderPage.selectOption(type_dropdown, 1);

    // Step 5: Select Service Name (Miscellaneous — index 0)
    const serviceName_dropdown = dialog.getByRole('combobox').nth(1);
    await createPurchaseOrderPage.selectOption(serviceName_dropdown, 0);

    // Step 6: Fill Description
    const description_input = dialog.locator(
        'input[placeholder*="escription"], textarea[placeholder*="escription"]'
    ).first();
    await description_input.waitFor({ state: 'visible' });
    await description_input.fill('Service');

    // Step 7: Select Cost Center
    const costCenter_dropdown = dialog.getByRole('combobox').nth(2);
    await createPurchaseOrderPage.selectOption(costCenter_dropdown, 0);

    // Step 7b: Select Tax
    const tax_dropdown = dialog.getByRole('combobox').nth(3);
    await createPurchaseOrderPage.selectOption(tax_dropdown, 0);

    // Step 7c: Enter Unit Price
    const unitPrice_input = dialog.getByPlaceholder('Enter Unit Price');
    await unitPrice_input.waitFor({ state: 'visible' });
    await unitPrice_input.fill('500');

    // Step 8: Save Line
    const saveLine_btn = dialog.getByRole('button', { name: 'Save', exact: true });
    await expect(saveLine_btn).toBeEnabled({ timeout: 10000 });
    await saveLine_btn.click();
    await page.locator('.p-dialog').waitFor({ state: 'hidden' });

    // Step 9: Click Submit (NOT Save as Draft)
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });
    const submit_btn = page.getByRole('button', { name: 'Submit', exact: true });
    await expect(submit_btn).toBeVisible({ timeout: 15000 });
    await expect(submit_btn).toBeEnabled({ timeout: 15000 });
    await expect(submit_btn).not.toHaveText('Save as Draft');
    await submit_btn.click();
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });
});

// ✅ TEST 2: Freight — Fixed to use nth(1) selector for Service Name (Freight = index 1)
test.only('Verify Create Purchase Order Service Line Freight', async ({ page }) => {
    await managePurchaseOrderPage.navigateToPurchaseOrders();
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
    await expect(managePurchaseOrderPage.create_btn).toBeVisible({ timeout: 15000 });
    await managePurchaseOrderPage.create_btn.click();
    await expect(page).toHaveURL(/add-purchase-order/);

    // Step 1 & 2: Fill header fields
    await createPurchaseOrderPage.fillRequiredFields();

    // Step 3: Click Add Line
    await createPurchaseOrderPage.addPurchaseLine();

    const dialog = page.locator('.p-dialog:visible');

    // Step 4: Select Type as "Services"
    const type_dropdown = dialog.getByRole('combobox').nth(0);
    await createPurchaseOrderPage.selectOption(type_dropdown, 1);

    // ✅ Step 5: Select Service Name (Freight — index 1, second option in dropdown)
    const serviceName_dropdown = dialog.getByRole('combobox').nth(1);
    await createPurchaseOrderPage.selectOption(serviceName_dropdown, 1); // 0=Miscellaneous, 1=Freight

    // Step 6: Fill Description
    const description_input = dialog.locator(
        'input[placeholder*="escription"], textarea[placeholder*="escription"]'
    ).first();
    await description_input.waitFor({ state: 'visible' });
    await description_input.fill('Service');

    // Step 7: Select Cost Center
    const costCenter_dropdown = dialog.getByRole('combobox').nth(2);
    await createPurchaseOrderPage.selectOption(costCenter_dropdown, 0);

    // Step 7b: Select Tax
    const tax_dropdown = dialog.getByRole('combobox').nth(3);
    await createPurchaseOrderPage.selectOption(tax_dropdown, 0);

    // Step 7c: Enter Unit Price
    const unitPrice_input = dialog.getByPlaceholder('Enter Unit Price');
    await unitPrice_input.waitFor({ state: 'visible' });
    await unitPrice_input.fill('500');

    // Step 8: Save Line
    const saveLine_btn = dialog.getByRole('button', { name: 'Save', exact: true });
    await expect(saveLine_btn).toBeEnabled({ timeout: 10000 });
    await saveLine_btn.click();
    await page.locator('.p-dialog').waitFor({ state: 'hidden' });

    // Step 9: Click Submit (NOT Save as Draft)
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });
    const submit_btn = page.getByRole('button', { name: 'Submit', exact: true });
    await expect(submit_btn).toBeVisible({ timeout: 15000 });
    await expect(submit_btn).toBeEnabled({ timeout: 15000 });
    await expect(submit_btn).not.toHaveText('Save as Draft'); // ✅ Assert it's NOT Save as Draft
    await submit_btn.click();
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });
});

// ✅ TEST 3: Two Lines — Miscellaneous + Freight
test.only('Verify Create Purchase Order Service Lines Freight & Miscellaneous', async ({ page }) => {
    await managePurchaseOrderPage.navigateToPurchaseOrders();
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden' });
    await expect(managePurchaseOrderPage.create_btn).toBeVisible({ timeout: 15000 });
    await managePurchaseOrderPage.create_btn.click();
    await expect(page).toHaveURL(/add-purchase-order/);

    // Step 1 & 2: Fill header fields
    await createPurchaseOrderPage.fillRequiredFields();

    // ─────────────────────────────────────────
    // 🟦 SERVICE LINE 1: Miscellaneous
    // ─────────────────────────────────────────
    await createPurchaseOrderPage.addPurchaseLine();
    const dialog1 = page.locator('.p-dialog:visible');

    const type_dropdown1 = dialog1.getByRole('combobox').nth(0);
    await createPurchaseOrderPage.selectOption(type_dropdown1, 1);

    const serviceName_dropdown1 = dialog1.getByRole('combobox').nth(1);
    await createPurchaseOrderPage.selectOption(serviceName_dropdown1, 0); // Miscellaneous

    const description_input1 = dialog1.locator(
        'input[placeholder*="escription"], textarea[placeholder*="escription"]'
    ).first();
    await description_input1.waitFor({ state: 'visible' });
    await description_input1.fill('Service');

    const costCenter_dropdown1 = dialog1.getByRole('combobox').nth(2);
    await createPurchaseOrderPage.selectOption(costCenter_dropdown1, 0);

    const tax_dropdown1 = dialog1.getByRole('combobox').nth(3);
    await createPurchaseOrderPage.selectOption(tax_dropdown1, 0);

    const unitPrice_input1 = dialog1.getByPlaceholder('Enter Unit Price');
    await unitPrice_input1.waitFor({ state: 'visible' });
    await unitPrice_input1.fill('500');

    const saveLine_btn1 = dialog1.getByRole('button', { name: 'Save', exact: true });
    await expect(saveLine_btn1).toBeEnabled({ timeout: 10000 });
    await saveLine_btn1.click();
    await page.locator('.p-dialog').waitFor({ state: 'hidden' });

    // ─────────────────────────────────────────
    // 🟩 SERVICE LINE 2: Freight
    // ─────────────────────────────────────────
    await createPurchaseOrderPage.addPurchaseLine();
    const dialog2 = page.locator('.p-dialog:visible');

    const type_dropdown2 = dialog2.getByRole('combobox').nth(0);
    await createPurchaseOrderPage.selectOption(type_dropdown2, 1);

    // ✅ Freight = index 1
    const serviceName_dropdown2 = dialog2.getByRole('combobox').nth(1);
    await createPurchaseOrderPage.selectOption(serviceName_dropdown2, 1); // Freight

    const description_input2 = dialog2.locator(
        'input[placeholder*="escription"], textarea[placeholder*="escription"]'
    ).first();
    await description_input2.waitFor({ state: 'visible' });
    await description_input2.fill('Service');

    const costCenter_dropdown2 = dialog2.getByRole('combobox').nth(2);
    await createPurchaseOrderPage.selectOption(costCenter_dropdown2, 0);

    const tax_dropdown2 = dialog2.getByRole('combobox').nth(3);
    await createPurchaseOrderPage.selectOption(tax_dropdown2, 0);

    const unitPrice_input2 = dialog2.getByPlaceholder('Enter Unit Price');
    await unitPrice_input2.waitFor({ state: 'visible' });
    await unitPrice_input2.fill('500');

    const saveLine_btn2 = dialog2.getByRole('button', { name: 'Save', exact: true });
    await expect(saveLine_btn2).toBeEnabled({ timeout: 10000 });
    await saveLine_btn2.click();
    await page.locator('.p-dialog').waitFor({ state: 'hidden' });

    // ─────────────────────────────────────────
    // Step 9: Click Submit (NOT Save as Draft)
    // ─────────────────────────────────────────
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });
    const submit_btn = page.getByRole('button', { name: 'Submit', exact: true });
    await expect(submit_btn).toBeVisible({ timeout: 15000 });
    await expect(submit_btn).toBeEnabled({ timeout: 15000 });
    await expect(submit_btn).not.toHaveText('Save as Draft'); // ✅ Assert it's NOT Save as Draft
    await submit_btn.click();
    await page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });
});