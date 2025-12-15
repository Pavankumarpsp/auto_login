# Playwright Automation Framework

This project is a test automation framework for Automation Anywhere Community Edition, built using Playwright and TypeScript.

## Prerequisites

-   Node.js (v14 or higher)
-   npm

## Setup

1.  Clone the repository (or unzip the project).
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory based on `.env.example`:
    ```env
    USERNAME=your_email@example.com
    PASSWORD=your_password
    ```

## Project Structure

-   `pages/`: Page Object Model classes (LoginPage, AutomationPage, TaskBotPage, FormPage).
-   `tests/`: Test specification files (*.spec.ts).
-   `utils/`: Utility classes (ApiService).
-   `test-data/`: Test data files.
-   `playwright.config.ts`: Playwright configuration.

## Running Tests

To run all tests:
```bash
npm test
# or
npx playwright test
```

To run a specific test file:
```bash
npx playwright test tests/messageBox.spec.ts
```

To run in headed mode (visible browser):
```bash
npx playwright test --headed
```

To view the test report:
```bash
npx playwright show-report
```

## Use Cases Covered

1.  **Message Box Task**: Creates a Task Bot and adds a Message Box action.
2.  **Form with Upload**: Creates a Form, adds elements, and uploads a file.
3.  **Learning Instance API**: Creates a Learning Instance via API.
