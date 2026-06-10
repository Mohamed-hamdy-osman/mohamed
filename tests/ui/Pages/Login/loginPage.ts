import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly username_tb: Locator;
    readonly password_tb: Locator;
    readonly login_btn: Locator;
    readonly InvalidLoginFailure_locator: Locator;
    readonly logToCorporate_btn: Locator;

    readonly url: string = 'https://test.actorserp.com/zeta/#/login?tenantId=zeta';

    constructor(page: Page) {
        this.page = page;

        this.username_tb = page.getByPlaceholder('username');
        this.password_tb = page.getByRole('textbox', { name: 'Password' });

        // ✅ More resilient — matches any submit-style button
        this.login_btn = page.getByRole('button', { name: /next|login|sign in/i }).last();
        this.InvalidLoginFailure_locator = page.getByText('Password is invalid');
        this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' }).last();
    }

    async goto() {
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
        await this.page.waitForLoadState('networkidle'); // ✅ Wait for full page settle
    }

    async login(username: string, password: string) {
        // Step 1: Enter username and proceed to password page
        await this.username_tb.waitFor({ state: 'visible' });
        await this.username_tb.fill(username);
        await this.login_btn.click();

        // Step 2: Wait for password page to load, then fill
        await this.password_tb.waitFor({ state: 'visible' }); // ✅ Ensures page 2 is ready
        await this.password_tb.fill(password);
        await this.login_btn.click();
    }

    async verifyLoginSuccessWithCorporate() {
        // Wait for either /main redirect or the corporate button to appear
        await this.page.waitForLoadState('domcontentloaded');

        // Dismiss alert dialog if present
        const alertDialog = this.page.getByRole('alertdialog');
        try {
            await alertDialog.waitFor({ state: 'visible', timeout: 5000 });
            const closeBtn = alertDialog.locator('button').first();
            await closeBtn.click();
        } catch {
            // No dialog present — continue normally
        }

        // If already redirected to /main, skip the corporate button click
        if (this.page.url().includes('/main')) return;

        // Wait for corporate button then click
        await expect(this.logToCorporate_btn).toBeVisible({ timeout: 30000 });
        await Promise.all([
            this.page.waitForURL(/main/, { timeout: 30000 }),
            this.logToCorporate_btn.click(),
        ]);
    }

    async verifyLoginSuccess() {
        await expect(this.page.locator('tbody tr').first()).toBeVisible({ timeout: 30000 });
    }

    async verifyLoginFailure() {
        await expect(this.InvalidLoginFailure_locator).toBeVisible({ timeout: 10000 });
    }

    async navigateToApp() {
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
        await this.page.waitForLoadState('networkidle');
        if (await this.logToCorporate_btn.isVisible()) {
            await Promise.all([
                this.page.waitForURL(/main/),
                this.logToCorporate_btn.click(),
            ]);
        }
    }
}