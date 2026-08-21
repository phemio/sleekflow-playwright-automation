# sleekflow-playwright-automation

## 1. Project Setup
● How would you initialize a Playwright project for testing the sleekflow.io website?
○ Expected topics: project structure, config files, environment setup (Node.js,
TypeScript/JavaScript), test runner.
#### **ANS**: use `npm init playwright@latest` to setup the environment for, create pages and test folder which using POM structure for high-capacity of reusibility case, setup the playwright.config.ts for baseURL,driver, retries mechanism so on. Furthermore, test runner can set an easier commmand in package.json to run with e.g. `playwright test --headed` or `npm run test:headed`

## 2. Test Case Planning
● What are the key elements you would identify and test in the Signup flow?
#### **ANS**: 
#### Key elements(Mandatory step for functional test):
- Email address field
- TnC checkbox
- SignUp Button
- Social Login
- Password field in password create page

● What validation steps would you include in the Login test case?
○ Follow-up: How would you handle testing with both valid and invalid credentials?

Steps:
1. Validate in Login Page and check the elements 
2. Enter valid email or username in email field
3. [Blocker]: if there is any recaptcha, need dev to provide e.g. ip bypass or feature flag to close the validation
4. Check redirect to password input page
5. Enter valid password
6. Click SignIn Button
7. Check able to enter dashboard or company info page

I think the best practice to handle testing with both valid and invalid credentials would be defined two test case, check with dev for the valid format and invalid format(e.g double . or @ is not allowed, what is the regex), then include those in the negative case and check the error message would be displayed. Valid one would be in the happy path case. 

## 3. Locator Strategy
● How would you locate elements such as input fields, buttons, and error messages on the
signup or login page?
○ Expected mention of: getByRole, getByLabelText, CSS, XPath, data-testid,
best practices.
#### **ANS**: Can use `npx playwright codegen {url}}` to record and located the elements. 
For General elements locating method, I prioritise to use getByRole as it include the element type and the name which is easily to understand what it is e.g. `getByRole('link', { name: 'Sign up' })`

For others method, I avoid hardcoded CSS selectors and XPath. Since they depend heavily on structural and styling implementation details, they are ease to be fail whenever FE code is refactored.

## 4. Waits and Timing
● How do you handle asynchronous events, such as waiting for a confirmation message or a
redirect after login?
○ Expected: use of await page.waitForSelector, expect().toBeVisible(),
auto-waiting behavior of Playwright.

#### **ANS**: For handle asynchronous events, I will use `await expect(locator).toBeVisible()` as Web-first assertions automatically retry until the element appears or timeout. 

## 5. Test Data Management
● How would you handle creating new test users for the Signup tests without cluttering the
system with dummy data?

#### **ANS**: I will use dynamic generation with DDMMYY+(index++) to create new test users without duplicate user name and generate function to create new email.

## 6. Reusability
● How would you structure your code to reuse components like login steps across multiple test
cases?

#### **ANS**: I will use Page Object Model to encapsulate page elements and user workflows into dedicated Page Classes. Call it whenever needed.  This could isolates any UI changes if a selector updates. Also build Custom Fixtures to avoid instantiation everytime `fixtures/test.fixture.ts`

## 7. Headless vs Headed
● When would you run your tests in headless mode versus headed mode? How does this affect
debugging?

#### **ANS**: 
- headed mode: during local development and debugging, able to see the real-time behaviour in browser
- headless mode: During regression test and CI/CD workflow, can save the resouruce and execute rapidly.

## 8. CI Integration
● How would you integrate your Playwright test suite into a CI/CD pipeline?

#### **ANS**: Configure in `.github/workflows/playwright.yml`, set the cron schedule for delegate time to run regularly for regression period, also set for pull request/push branch to Github to ensure remote branch run smooth. 


## 9. Error Handling
● How would you capture screenshots or logs when a test fails?

#### **ANS**: Set screenshot,trace,video in `playwright.config.ts` for failure case. This automatically captures screenshots and trace files only when a test fails.
```
export default defineConfig({
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
```