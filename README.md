# Airdrop Linker - Chrome Extension & Web App

Airdrop Linker is a powerful tool designed to help users collect, organize, and batch-open links for airdrop farming and web3 opportunities. This repository contains both a Chrome extension and a web application.

![Airdrop Linker](https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80)

## Table of Contents

- [Features](#features)
- [Deployment Options](#deployment-options)
  - [Shared Hosting Deployment](#shared-hosting-deployment)
  - [Vercel Deployment](#vercel-deployment)
  - [Netlify Deployment](#netlify-deployment)
  - [GitHub Pages Deployment](#github-pages-deployment)
  - [Firebase Hosting Deployment](#firebase-hosting-deployment)
- [Chrome Extension Deployment](#chrome-extension-deployment)
- [Local Development](#local-development)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- **Link Collection**: Save links with custom titles and tags
- **Organization**: Categorize links with tags for easy filtering
- **Batch Processing**: Open multiple links with a single click
- **Import/Export**: Backup or share your link collections
- **Chrome Extension**: Right-click context menu integration for saving links
- **Responsive Design**: Works on desktop and mobile devices

## Deployment Options

### Shared Hosting Deployment

1. **Build the project**:

   ```bash
   npm run build
   ```

   This will create a `dist` folder with static files ready for deployment.

2. **Upload to shared hosting**:

   - Connect to your shared hosting via FTP (using tools like FileZilla, Cyberduck, etc.)
   - Upload the entire contents of the `dist` folder to your hosting's public directory (often called `public_html`, `www`, or `htdocs`)

3. **Configure server**:

   For proper routing with React Router, you'll need to set up URL rewriting. Create a `.htaccess` file in your public directory with the following content:

   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

4. **Test your deployment**:
   - Visit your domain to ensure the application loads correctly
   - Test navigation to ensure routes work properly
   - Verify all features are functioning as expected

### Vercel Deployment

1. **Install Vercel CLI** (optional):

   ```bash
   npm install -g vercel
   ```

2. **Deploy using Vercel CLI**:

   ```bash
   vercel
   ```

   Or connect your GitHub repository to Vercel for automatic deployments:

   - Create an account on [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings (Build command: `npm run build`, Output directory: `dist`)
   - Deploy

### Netlify Deployment

1. **Install Netlify CLI** (optional):

   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy using Netlify CLI**:

   ```bash
   netlify deploy
   ```

   Or connect your GitHub repository to Netlify:

   - Create an account on [Netlify](https://netlify.com)
   - Import your GitHub repository
   - Configure build settings (Build command: `npm run build`, Publish directory: `dist`)
   - Add a `_redirects` file to the `public` folder with the content:
     ```
     /* /index.html 200
     ```
   - Deploy

### GitHub Pages Deployment

1. **Configure for GitHub Pages**:

   Update `vite.config.ts` to include the correct base path:

   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // other config options...
   });
   ```

2. **Create a deployment script**:

   Add this to your `package.json`:

   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Install gh-pages package**:

   ```bash
   npm install --save-dev gh-pages
   ```

4. **Deploy to GitHub Pages**:

   ```bash
   npm run deploy
   ```

### Firebase Hosting Deployment

1. **Install Firebase CLI**:

   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:

   ```bash
   firebase login
   ```

3. **Initialize Firebase**:

   ```bash
   firebase init
   ```

   - Select Hosting
   - Choose your Firebase project
   - Set public directory to `dist`
   - Configure as a single-page app: Yes

4. **Deploy to Firebase**:

   ```bash
   npm run build
   firebase deploy
   ```

## Chrome Extension Deployment

1. **Build the extension**:

   ```bash
   npm run build:extension
   ```

   This creates a `dist-extension` folder with all necessary files.

2. **Load the extension in Chrome for testing**:

   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked" and select the `dist-extension` folder
   - The extension icon should appear in your browser toolbar

3. **Publish to Chrome Web Store**:

   - Create a ZIP file of the `dist-extension` folder
   - Create a developer account at the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
   - Pay the one-time developer registration fee ($5 USD)
   - Click "New Item" and upload your ZIP file
   - Fill out the required information:
     - Description
     - Screenshots (at least one)
     - Store icon
     - Category (Productivity)
     - Language
     - Privacy practices
   - Submit for review

   The review process typically takes a few business days. Once approved, your extension will be published to the Chrome Web Store.

4. **Update the extension**:

   To update the extension:
   - Increment the version number in `public/manifest.json`
   - Run the build command again
   - Create a new ZIP file
   - Upload the new ZIP to the Chrome Web Store Developer Dashboard
   - Submit for review

## Local Development

1. **Clone the repository**:

   ```bash
   git clone <your-repository-url>
   cd airdrop-linker
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Build for production**:

   ```bash
   npm run build
   ```

5. **Preview production build**:

   ```bash
   npm run preview
   ```

## Project Structure

```
├── public/               # Static assets and extension files
│   ├── background.js     # Chrome extension background script
│   ├── manifest.json     # Chrome extension manifest
│   └── icons/            # Extension icons
├── src/
│   ├── components/       # React components
│   ├── lib/              # Utility functions and services
│   ├── types/            # TypeScript type definitions
│   └── App.tsx           # Main application component
├── index.html           # HTML entry point
├── vite.config.ts       # Vite configuration
└── vite.config.extension.ts # Extension build configuration
```

## License

MIT License
