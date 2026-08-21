import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  // --- Core UI Elements ---
  readonly headingWelcomeBack: Locator;
  readonly textSignInToContinue: Locator;
  readonly linkSignUp: Locator;
  readonly textNoAccountSignUp: Locator;
  readonly btnContinue: Locator;

  // --- Captcha ---
  readonly imgCaptcha: Locator;
  readonly inputCaptchaCode: Locator;

  // --- Social login buttons ---
  readonly btnGoogle: Locator;
  readonly btnApple: Locator;

  // --- Other UIs ---
  readonly linkSleekflowLogo: Locator;
  readonly elCarousel: Locator;
  readonly textOrDivider: Locator;
  readonly elLanguageLabel: Locator;

  // --- Legal Links ---
  readonly linkTerms: Locator;
  readonly linkPrivacy: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headingWelcomeBack = page.getByRole('heading', { name: 'Welcome back' });
    this.textSignInToContinue = page.getByText('Sign in to continue to');
    this.linkSignUp = page.getByRole('link', { name: 'Sign up' });
    this.textNoAccountSignUp = page.getByText('Don\'t have an account? Sign up');
    this.imgCaptcha = page.getByRole('img', { name: 'captcha' });
    this.inputCaptchaCode = page.getByRole('textbox', { name: 'Enter the code shown above' });
    this.btnContinue = page.getByRole('button', { name: 'Continue', exact: true });
    this.btnGoogle = page.getByRole('button', { name: 'Continue with Google' });
    this.btnApple = page.getByRole('button', { name: 'Continue with Apple' });
    this.linkSleekflowLogo = page.getByRole('link').first();
    this.elCarousel = page.locator('#carousel');
    this.textOrDivider = page.locator('div').filter({ hasText: /^OR$/ });
    this.elLanguageLabel = page.locator('#selected-language-label');
    this.linkTerms = page.getByRole('link', { name: 'Terms and Conditions' });
    this.linkPrivacy = page.getByRole('link', { name: 'Privacy Policy' });
  }

  async gotoLoginPage() {
    await this.page.goto('/');
  }

  async clickSignUp() {
    await this.linkSignUp.click();
  }
}
