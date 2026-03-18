import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly username_tb: Locator;
    readonly password_tb: Locator;
    readonly login_btn: Locator;
    readonly InvalidLoginFailure_locator: Locator;

    readonly url: string = 'https://test.actorserp.com/zeta';

    constructor(page: Page) {
        this.page = page;

        this.username_tb = page.locator('#loginName');
        this.password_tb = page.getByRole('textbox', { name: 'Password' });
        this.login_btn = page.locator('#submit-button');

        this.InvalidLoginFailure_locator = page.getByText('Password is invalid');
    }

    async goto() {
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    }

    async login(username: string, password: string) {

        await this.page.waitForSelector('#loginName');
        await this.username_tb.fill(username);
        await this.login_btn.click();
                await this.page.waitForSelector('#password');

        await this.page.waitForTimeout(1000); 
        await this.password_tb.fill(password);

        await this.login_btn.click();
    }

    async verifyLoginSuccess() {

        await this.page.waitForURL(/choose-module/, { timeout: 20000 });

    }

    async verifyLoginFailure() {

        await expect(this.page).not.toHaveURL(/choose-module/);
        await expect(this.InvalidLoginFailure_locator).toBeVisible();

    }
}