import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/login/loginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }, testInfo) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
  console.log(`test start for test ${testInfo.title}`);
});

test.afterEach(async ({ }, testInfo) => {
  console.log(`end test ${testInfo.title}`);
});

test('Valid Login Test', async () => {
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');

});
test('Valid Login with Corporate Test', async () => {
  await loginPage.login('admin@zeta.com', 'P@ssw0rd');
  await loginPage.verifyLoginSuccessWithCorporate();
});
test('InValid Login Test', async () => {
  await loginPage.login('admin@zeta.com', 'P@ssw0rd?');
  await loginPage.verifyLoginFailure();
});