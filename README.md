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



---
<img width="948" height="429" alt="Screenshot 2025-12-15 101405" src="https://github.com/user-attachments/assets/f5bcf129-a7a8-4e26-b2e4-ced7a8d4fafd" />
<img width="941" height="438" alt="Screenshot 2025-12-15 101345" src="https://github.com/user-attachments/assets/8ac66900-7c46-4f9c-879c-48516da6998d" />
<img width="956" height="476" alt="Screenshot 2025-12-15 101323" src="https://github.com/user-attachments/assets/712d6a9d-9ae3-4046-8b2e-52cc2d6c4570" />







## Use Cases Covered

1.  **Message Box Task**: Creates a Task Bot and adds a Message Box action.
2.  **Form with Upload**: Creates a Form, adds elements, and uploads a file.
3.  **Learning Instance API**: Creates a Learning Instance via API.
