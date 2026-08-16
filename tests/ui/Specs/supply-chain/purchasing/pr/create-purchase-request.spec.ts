import { test, expect } from '@playwright/test';
import { ManagePurchaseRequestPage } from '../../../../Pages/Supply-Chain/purchasing/pr/manage-purchase-request';
import { CreatePurchaseRequestPage } from '../../../../Pages/Supply-Chain/purchasing/pr/create-purchase-request';

let managePurchaseRequestPage!: ManagePurchaseRequestPage;
let createPurchaseRequestPage!: CreatePurchaseRequestPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }, testInfo) => {
    managePurchaseRequestPage = new ManagePurchaseRequestPage(page);
    createPurchaseRequestPage = new CreatePurchaseRequestPage(page);
    await page.goto('/zeta/choose-module');
    await page.waitForLoadState('load');
    console.log(`Test start: ${testInfo.title}`);
});

test.afterEach(async ({ page }, testInfo) => {
    await page.goto('/zeta/choose-module');
    await page.waitForLoadState('load');
    console.log(`Test end: ${testInfo.title}`);
});

test('Verify Create Purchase Request With Triple Lines Expenses & Assets & Inventory', async () => {
    await managePurchaseRequestPage.navigateToPurchaseRequests();
    await managePurchaseRequestPage.create_btn.click();
    await createPurchaseRequestPage.fillRequiredFields();
    await createPurchaseRequestPage.addMultiplePurchaseLines([
        {
            typeIndex: 0,
            groupIndex: 0,
            subGroupIndex: 0,
            itemIndex: 0,
            uomIndex: 0,

            quantity: '10',
            price: '20'
        },
        {
            typeIndex: 0,
            groupIndex: 1,
            subGroupIndex: 0,
            itemIndex: 0,
            uomIndex: 0,
            quantity: '15',
            price: '30'
        },
        {
            typeIndex: 0,
            groupIndex: 2,
            subGroupIndex: 0,
            itemIndex: 0,
            uomIndex: 0,
            quantity: '5',
            price: '25'
        },
    ]);
    await createPurchaseRequestPage.submitPurchaseRequest();
});

test('Verify Create Purchase Request Expenses', async () => {
    await managePurchaseRequestPage.navigateToPurchaseRequests();
    await managePurchaseRequestPage.create_btn.click();
    await createPurchaseRequestPage.fillRequiredFields();
    await createPurchaseRequestPage.addMultiplePurchaseLines([
        {
            typeIndex: 0,
            groupIndex: 0,
            subGroupIndex: 0,
            itemIndex: 0,
            uomIndex: 0,

            quantity: '10',
            price: '20'
        },
    ]);
    await createPurchaseRequestPage.submitPurchaseRequest();
});

test('Verify Create Purchase Request Assets', async () => {
    await managePurchaseRequestPage.navigateToPurchaseRequests();
    await managePurchaseRequestPage.create_btn.click();
    await createPurchaseRequestPage.fillRequiredFields();
    await createPurchaseRequestPage.addMultiplePurchaseLines([
        {
            typeIndex: 0,
            groupIndex: 1,
            subGroupIndex: 0,
            itemIndex: 0,
            uomIndex: 0,
            quantity: '15',
            price: '30'
        },
    ]);
    await createPurchaseRequestPage.submitPurchaseRequest();
});

test('Verify Create Purchase Request Inventory', async () => {
    await managePurchaseRequestPage.navigateToPurchaseRequests();
    await managePurchaseRequestPage.create_btn.click();
    await createPurchaseRequestPage.fillRequiredFields();
    await createPurchaseRequestPage.addMultiplePurchaseLines([
        {
            typeIndex: 0,
            groupIndex: 2,
            subGroupIndex: 0,
            itemIndex: 0,
            uomIndex: 0,
            quantity: '5',
            price: '25'
        },
    ]);
    await createPurchaseRequestPage.submitPurchaseRequest();
});


test('Verify Create Purchase Request Service Line Miscellaneous', async ({ page }) => {
    await managePurchaseRequestPage.navigateToPurchaseRequests();
    await managePurchaseRequestPage.create_btn.click();
    await createPurchaseRequestPage.fillRequiredFields();
    await createPurchaseRequestPage.addPurchaseLine();
    const dialog = page.locator('.p-dialog:visible');
    const type_dropdown = dialog.getByRole('combobox').nth(0);
    await createPurchaseRequestPage.selectOption(type_dropdown, 1);
    const serviceName_dropdown = dialog.getByRole('combobox').nth(1);
    await createPurchaseRequestPage.selectOptionBySearch(serviceName_dropdown, 'Miscellaneous');
    const description_input = dialog.locator(
        'input[placeholder*="escription"], textarea[placeholder*="escription"]'
    ).first();
    await description_input.waitFor({ state: 'visible' });
    await description_input.fill('Service');
    const costCenter_dropdown = dialog.getByRole('combobox').nth(2);
    await createPurchaseRequestPage.selectOption(costCenter_dropdown, 0);
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
    await expect(page.getByText('Purchase Request Submitted Successfully')).toBeVisible({ timeout: 15000 });
});

test('Verify Create Purchase Request Service Line Freight', async ({ page }) => {
    await managePurchaseRequestPage.navigateToPurchaseRequests();
    await managePurchaseRequestPage.create_btn.click();
    await createPurchaseRequestPage.fillRequiredFields();
    await createPurchaseRequestPage.addPurchaseLine();
    const dialog = page.locator('.p-dialog:visible');
    const type_dropdown = dialog.getByRole('combobox').nth(0);
    await createPurchaseRequestPage.selectOption(type_dropdown, 1);
    const serviceName_dropdown = dialog.getByRole('combobox').nth(1);
    await createPurchaseRequestPage.selectOptionBySearch(serviceName_dropdown, 'Freight');
    const description_input = dialog.locator(
        'input[placeholder*="escription"], textarea[placeholder*="escription"]'
    ).first();
    await description_input.waitFor({ state: 'visible' });
    await description_input.fill('Service');
    const costCenter_dropdown = dialog.getByRole('combobox').nth(2);
    await createPurchaseRequestPage.selectOption(costCenter_dropdown, 0);
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
    await expect(page.getByText('Purchase Request Submitted Successfully')).toBeVisible({ timeout: 15000 });
});

test('Verify Create Purchase Request Service Lines Miscellaneous & Freight', async ({ page }) => {
    await managePurchaseRequestPage.navigateToPurchaseRequests();
    await managePurchaseRequestPage.create_btn.click();
    await createPurchaseRequestPage.fillRequiredFields();
    await createPurchaseRequestPage.addPurchaseLine();
    const dialog1 = page.locator('.p-dialog:visible');
    const type_dropdown1 = dialog1.getByRole('combobox').nth(0);
    await createPurchaseRequestPage.selectOption(type_dropdown1, 1);
    const serviceName_dropdown1 = dialog1.getByRole('combobox').nth(1);
    await createPurchaseRequestPage.selectOptionBySearch(serviceName_dropdown1, 'Miscellaneous');
    const description_input1 = dialog1.locator(
        'input[placeholder*="escription"], textarea[placeholder*="escription"]'
    ).first();
    await description_input1.waitFor({ state: 'visible' });
    await description_input1.fill('Service');
    const costCenter_dropdown1 = dialog1.getByRole('combobox').nth(2);
    await createPurchaseRequestPage.selectOption(costCenter_dropdown1, 0);
    const unitPrice_input1 = dialog1.getByPlaceholder('Enter Unit Price');
    await unitPrice_input1.waitFor({ state: 'visible' });
    await unitPrice_input1.fill('500');
    const saveLine_btn1 = dialog1.getByRole('button', { name: 'Save', exact: true });
    await expect(saveLine_btn1).toBeEnabled({ timeout: 10000 });
    await saveLine_btn1.click();
    await page.locator('.p-dialog').waitFor({ state: 'hidden' });
    await createPurchaseRequestPage.addPurchaseLine();
    const dialog2 = page.locator('.p-dialog:visible');
    const type_dropdown2 = dialog2.getByRole('combobox').nth(0);
    await createPurchaseRequestPage.selectOption(type_dropdown2, 1);
    const serviceName_dropdown2 = dialog2.getByRole('combobox').nth(1);
    await createPurchaseRequestPage.selectOptionBySearch(serviceName_dropdown2, 'Freight');
    const description_input2 = dialog2.locator(
        'input[placeholder*="escription"], textarea[placeholder*="escription"]'
    ).first();
    await description_input2.waitFor({ state: 'visible' });
    await description_input2.fill('Service');
    const costCenter_dropdown2 = dialog2.getByRole('combobox').nth(2);
    await createPurchaseRequestPage.selectOption(costCenter_dropdown2, 0);
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
    await expect(page.getByText('Purchase Request Submitted Successfully')).toBeVisible({ timeout: 15000 });
});