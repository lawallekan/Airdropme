# Running Airdrop Linker in VS Code

## Prerequisites

- [VS Code](https://code.visualstudio.com/) installed
- [Node.js](https://nodejs.org/) (v16 or higher) installed
- [Git](https://git-scm.com/) installed

## Step 1: Clone the Repository

1. Open VS Code
2. Open the terminal in VS Code (Terminal > New Terminal)
3. Clone your repository (or download and extract the ZIP file):
   ```bash
   git clone <your-repository-url>
   cd <repository-folder>
   ```

## Step 2: Install Dependencies

1. In the VS Code terminal, run:
   ```bash
   npm install
   ```
   This will install all the required dependencies listed in package.json.

## Step 3: Development Mode

1. To run the project in development mode:
   ```bash
   npm run dev
   ```
   This will start a local development server, typically at http://localhost:5173

2. You can view and test the UI in your browser at this address

## Step 4: Building the Extension

1. To build the Chrome extension:
   ```bash
   npm run build:extension
   ```
   This creates a `dist-extension` folder with the packaged extension

## Step 5: Testing the Extension in Chrome

1. Open Chrome browser
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `dist-extension` folder from your project
6. The extension icon should appear in your Chrome toolbar

## Step 6: Making Changes

1. Open the project files in VS Code's explorer
2. Main files to edit:
   - `src/components/` - Contains all UI components
   - `public/background.js` - Background script for Chrome extension
   - `public/manifest.json` - Extension configuration

3. After making changes:
   - For UI testing: The dev server should auto-reload
   - For extension testing: Run `npm run build:extension` again and refresh the extension in Chrome

## VS Code Extensions That Help

Install these VS Code extensions for a better development experience:

1. **ESLint** - For JavaScript/TypeScript linting
2. **Prettier** - For code formatting
3. **Tailwind CSS IntelliSense** - For Tailwind CSS class suggestions
4. **ES7+ React/Redux/React-Native snippets** - For React snippets

## Debugging

1. **UI Debugging**:
   - Use browser DevTools (F12) when running in dev mode
   - React DevTools extension for Chrome is helpful

2. **Extension Debugging**:
   - In Chrome, go to the extensions page
   - Click "Inspect views: service worker" for background script debugging
   - Click "Inspect popup" when clicking on the extension icon

## Common Issues

1. **Port already in use**: If port 5173 is already in use, Vite will try to use another port automatically

2. **Extension not updating**: Make sure to:
   - Run `npm run build:extension` after changes
   - Go to Chrome extensions page and click the refresh icon on your extension

3. **Missing dependencies**: If you get errors about missing packages, run:
   ```bash
   npm install
   ```

4. **TypeScript errors**: Some TypeScript errors might not prevent the build but will show warnings. Fix them for better code quality.
