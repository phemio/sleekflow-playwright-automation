import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Feature', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
  });

  test('Login_001 - Verify all login page elements are visible', async ({ page }) => {
    // Core UI Elements
    await expect(loginPage.headingWelcomeBack).toBeVisible();
    await expect(loginPage.textSignInToContinue).toBeVisible();
    await expect(loginPage.linkSignUp).toBeVisible();
    await expect(loginPage.textNoAccountSignUp).toBeVisible();
    await expect(loginPage.btnContinue).toBeVisible();

    // CAPTCHA
    const hasCaptcha = await loginPage.imgCaptcha.isVisible();
    if (hasCaptcha) {
      await expect(loginPage.imgCaptcha).toBeVisible();
      await expect(loginPage.inputCaptchaCode).toBeVisible();
    }

    // Social login buttons
    await expect(loginPage.btnGoogle).toBeVisible();
    await expect(loginPage.btnApple).toBeVisible();

    // other UIs
    await expect(loginPage.elCarousel).toBeVisible();
    await expect(loginPage.textOrDivider).toBeVisible();
    await expect(loginPage.linkSleekflowLogo).toBeVisible();
    await expect(loginPage.elLanguageLabel).toBeVisible();

    // Legal Links
    await expect(loginPage.linkTerms).toBeVisible();
    await expect(loginPage.linkPrivacy).toBeVisible();


  });
});
