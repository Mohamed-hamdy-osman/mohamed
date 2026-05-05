import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly username_tb: Locator;
    readonly password_tb: Locator;
    readonly login_btn: Locator;
    readonly InvalidLoginFailure_locator: Locator;
    readonly logToCorporate_btn: Locator;

    readonly url: string = 'https://test.actorserp.com/zeta';

    constructor(page: Page) {
        this.page = page;

        this.username_tb = page.locator('#loginName');
        this.password_tb = page.locator('#password');
        this.login_btn = page.locator('#submit-button');
        this.InvalidLoginFailure_locator = page.getByText('Password is invalid');

        // Selector for the Corporate login buttons
        this.logToCorporate_btn = page.getByRole('button', { name: 'Log to Corporate' });
    }

    async goto() {
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    }

    async login(username: string, password: string) {

        await this.username_tb.waitFor();
        await this.username_tb.fill(username);

        await this.login_btn.click();

        await this.password_tb.waitFor();
        await this.password_tb.fill(password);

        await this.login_btn.click();
    }

    async verifyLoginSuccess() {

        // تأكد إن الجدول ظهر
        await expect(this.page.locator('tbody tr').first()).toBeVisible({ timeout: 30000 });

    }

    async verifyLoginSuccessWithCorporate(index: number = 1) {

        await this.page.waitForLoadState('networkidle');

        const targetBtn = this.logToCorporate_btn.nth(index);
        await expect(targetBtn).toBeVisible();

        await Promise.all([
            this.page.waitForURL(/main/),
            targetBtn.click()
        ]);

    }

    async verifyLoginFailure() {

        await expect(this.InvalidLoginFailure_locator).toBeVisible();

    }
}