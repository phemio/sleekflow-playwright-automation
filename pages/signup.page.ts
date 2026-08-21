import { Page, Locator } from '@playwright/test';

export class SignUpPage {
  readonly page: Page;
  readonly inputEmail: Locator;
  readonly inputPassword: Locator;
  readonly btnSignUp: Locator;
  readonly checkboxTNC: Locator;
  readonly btnContinue: Locator;
  readonly textSignUpToContinue: Locator;
  readonly textFillInDetailsToSignUp: Locator;
  readonly textConfirmEmailAddress: Locator;
  readonly textErrorMsg: Locator;


  constructor(page: Page) {
    this.page = page;
    this.inputEmail = page.getByRole('textbox', { name: 'Email address' });
    this.btnSignUp = page.getByRole('button', { name: 'Sign up' });
    this.checkboxTNC = page.locator('#terms-of-service');
    this.btnContinue = page.getByRole('button', { name: /continue|sign up/i });
    this.textSignUpToContinue = page.getByText('Sign up for your SleekFlow');
    this.textFillInDetailsToSignUp = page.getByText('Fill in details to sign up');
    this.inputPassword = page.getByRole('textbox', { name: 'Password' });
    this.textConfirmEmailAddress = page.getByText('Confirm your email address');
    this.textErrorMsg = page.getByText('Email is not valid.')
  }

  async fillEmail(email: string) {
    await this.inputEmail.fill(email);
  }

  async fillPassword(password: string) {
    await this.inputPassword.fill(password);
  }

  async clickBtnSignUp() {
    await this.btnSignUp.click();
  }

   async clickCheckBoxTNC() {
    await this.checkboxTNC.click({ force: true });
  }
}
