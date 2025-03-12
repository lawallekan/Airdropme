# Deploying Airdrop Linker Chrome Extension

## Build the Extension

1. Run the build command to create the extension package:

```bash
npm run build:extension
```

This will create a `dist-extension` folder with all the necessary files for the Chrome extension.

2. Create extension icons (if not already done):
   - Place icon files in the public folder: `icon16.png`, `icon48.png`, and `icon128.png`
   - These will be copied to the build output

## Load the Extension in Chrome for Testing

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by toggling the switch in the top right corner
3. Click "Load unpacked" and select the `dist-extension` folder
4. The extension should now appear in your browser toolbar

## Publish to Chrome Web Store

1. Create a ZIP file of the `dist-extension` folder
2. Create a developer account at the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
3. Pay the one-time developer registration fee ($5 USD)
4. Click "New Item" and upload your ZIP file
5. Fill out the required information:
   - Description
   - Screenshots (at least one)
   - Store icon
   - Category (Productivity)
   - Language
   - Privacy practices
6. Submit for review

The review process typically takes a few business days. Once approved, your extension will be published to the Chrome Web Store.

## Update the Extension

To update the extension:

1. Increment the version number in `public/manifest.json`
2. Run the build command again
3. Create a new ZIP file
4. Upload the new ZIP to the Chrome Web Store Developer Dashboard
5. Submit for review

## Testing Context Menu Integration

To test the context menu integration:

1. Load the extension in Chrome
2. Right-click on any link on a webpage
3. Select "Save to Airdrop Linker" from the context menu
4. Click the extension icon to see if the link was saved
