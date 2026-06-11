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

// ✅ Updated — Unit Price added before Save button click
test.only('Verify Create Purchase Order Service Line', async ({ page }) => {
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

    // Step 5: Select Service Name (Miscellaneous — first option)
    const serviceName_dropdown = dialog.getByRole('combobox').nth(1);
    await createPurchaseOrderPage.selectOption(serviceName_dropdown, 0);

    // Step 6: Fill Description (mandatory)
    const description_input = dialog.locator(
        'input[placeholder*="escription"], textarea[placeholder*="escription"]'
    ).first();
    await description_input.waitFor({ state: 'visible' });
    await description_input.fill('Service');

    // Step 7: Select Cost Center (first available option)
    const costCenter_dropdown = dialog.getByRole('combobox').nth(2);
    await createPurchaseOrderPage.selectOption(costCenter_dropdown, 0);

    // Step 7b: Select Tax (first available option)
    const tax_dropdown = dialog.getByRole('combobox').nth(3);
    await createPurchaseOrderPage.selectOption(tax_dropdown, 0);

    // ✅ Step 7c: Enter Unit Price (required field)
    const unitPrice_input = dialog.getByPlaceholder('Enter Unit Price');
    await unitPrice_input.waitFor({ state: 'visible' });
    await unitPrice_input.fill('500');

    // Step 8: Click Save on line popup
    const saveLine_btn = dialog.getByRole('button', { name: 'Save', exact: true });
    await expect(saveLine_btn).toBeEnabled({ timeout: 10000 });
    await saveLine_btn.click();
    await page.locator('.p-dialog').waitFor({ state: 'hidden' });

  

    // Step 9: Click Submit
const submit_btn = page.getByRole('button', { name: 'Submit', exact: true });
await page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 }); // ensure page is settled
await expect(submit_btn).toBeVisible({ timeout: 15000 });
await expect(submit_btn).toBeEnabled({ timeout: 15000 });
await submit_btn.click();
await page.locator('.loader-wrapper').waitFor({ state: 'hidden', timeout: 30000 });
});