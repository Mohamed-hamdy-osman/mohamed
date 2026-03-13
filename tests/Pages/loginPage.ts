import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {

  readonly page: Page;
  readonly username_tb: Locator;
  readonly password_tb: Locator;
  readonly login_btn: Locator;
  readonly invalidLogin_msg: Locator;

  readonly url: string = 'https://test.actorserp.com/zeta';

  constructor(page: Page) {

    this.page = page;

    this.username_tb = page.locator('#loginName');

    this.password_tb = page.getByRole('textbox', { name: 'Password' });

    this.login_btn = page.locator('#submit-button');

    this.invalidLogin_msg = page.getByText('Password is invalid');

  }

  async goto() {

    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });

  }

  async login(username: string, password: string) {

    await this.username_tb.waitFor({ state: 'visible' });

    await this.username_tb.fill(username);

    await this.login_btn.click();

    await this.password_tb.waitFor({ state: 'visible' });

    await this.password_tb.fill(password);

    await this.login_btn.click();

  }

  async verifyLoginSuccess() {

    await this.page.waitForURL(/choose-module/, { timeout: 60000 });

  }

  async verifyLoginFailure() {

    await expect(this.invalidLogin_msg).toBeVisible();

  }

}