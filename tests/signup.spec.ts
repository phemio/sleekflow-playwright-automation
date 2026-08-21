import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { SignUpPage } from '../pages/signup.page';
import { newUniqueEmail } from './utils/email-generator';

test.describe('Signup Feature', () => {
  let signUpPage: SignUpPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    signUpPage = new SignUpPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.clickSignUp();
    await page.waitForTimeout(3000);
  });

  test('Signup_001 - Enter a valid email address in signup page', async ({ page }) => {
    const email = newUniqueEmail();
    console.log(`📧 Using email: ${email}`);

    // Check navigate to Sign Up Page
    await expect(signUpPage.textSignUpToContinue).toBeVisible();
    // input dynamic email
    await signUpPage.fillEmail(email);
    // checked TNC box
    await signUpPage.clickCheckBoxTNC();
    // click signUp button
    await signUpPage.clickBtnSignUp();
    // Check go to password page
    await expect(signUpPage.textFillInDetailsToSignUp).toBeVisible();
    // input valid password
    await signUpPage.fillPassword("Abc@2026");
    // click signUp button again
    await signUpPage.clickBtnSignUp();
    // check navigate to confirm email page
    await expect(signUpPage.textConfirmEmailAddress).toBeVisible();
  });

  test('Signup_002 - Enter an invalid email address in signup page', async ({ page }) => {
    // Check navigate to Sign Up Page
    await expect(signUpPage.textSignUpToContinue).toBeVisible();
    // input invalid email with @@
    await signUpPage.fillEmail('1123@@gmail.com');
    await page.waitForTimeout(5000);
    // checked TNC box
    await signUpPage.clickCheckBoxTNC();
    await page.waitForTimeout(5000);
    // click signUp button
    await signUpPage.clickBtnSignUp();
    // Check error message should display
    await expect(signUpPage.textErrorMsg).toBeVisible();
    await page.waitForTimeout(5000);
    // input invalid email with ..
    await signUpPage.fillEmail('11.23@gmail..com');
    // click signUp button again
    await signUpPage.clickBtnSignUp();
    // Check error message should display
    await expect(signUpPage.textErrorMsg).toBeVisible();
    await page.waitForTimeout(5000);
  });
});
