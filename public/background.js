// Background script for the Chrome extension

// Create context menu item when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  // Create the main context menu item
  chrome.contextMenus.create({
    id: "saveToAirdropLinker",
    title: "Save to Airdrop Linker",
    contexts: ["link"],
  });

  // Create context menu for page links
  chrome.contextMenus.create({
    id: "savePageToAirdropLinker",
    title: "Save Page to Airdrop Linker",
    contexts: ["page"],
  });

  // Initialize settings if not already set
  chrome.storage.local.get(["settings"], (result) => {
    if (!result.settings) {
      const defaultSettings = {
        maxTabsToOpen: 10,
        defaultTag: "Airdrop",
        autoBackup: false,
        backupFrequency: 7,
        notificationsEnabled: true,
        confirmBeforeOpening: true,
      };
      chrome.storage.local.set({ settings: defaultSettings });
    }
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveToAirdropLinker") {
    // Get the link URL and page title
    const url = info.linkUrl;
    const title = info.selectionText || url;

    // Save the link to storage
    saveLink(url, title);
  } else if (info.menuItemId === "savePageToAirdropLinker") {
    // Save the current page
    saveLink(tab.url, tab.title);
  }
});

// Function to save a link
function saveLink(url, title) {
  // Get existing links from storage and settings
  chrome.storage.local.get(["links", "settings"], (result) => {
    const links = result.links || [];
    const settings = result.settings || { defaultTag: "Airdrop" };

    // Check if link already exists
    const existingLink = links.find((link) => link.url === url);
    if (existingLink) {
      // If notifications are enabled, show a notification
      if (settings.notificationsEnabled !== false) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon128.png",
          title: "Link Already Saved",
          message: `"${title}" is already in your collection`,
        });
      }
      return;
    }

    // Create a new link object
    const newLink = {
      id: Date.now().toString(),
      url: url,
      title: title,
      tags: [settings.defaultTag || "Airdrop"],
      createdAt: new Date().toISOString(),
    };

    // Add the new link to the array
    links.push(newLink);

    // Save the updated links array back to storage
    chrome.storage.local.set({ links: links }, () => {
      // If notifications are enabled, show a notification
      if (settings.notificationsEnabled !== false) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon128.png",
          title: "Link Saved",
          message: `"${title}" has been saved to Airdrop Linker`,
        });
      }
    });
  });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openTabs") {
    const { urls, maxTabs } = message;

    // Open tabs up to the maximum allowed
    const urlsToOpen = urls.slice(0, maxTabs);
    urlsToOpen.forEach((url) => {
      chrome.tabs.create({ url, active: false });
    });

    sendResponse({ success: true, count: urlsToOpen.length });
  }

  // Always return true for async response
  return true;
});

// Optional: Set up automatic backup if enabled
chrome.alarms.create("checkBackup", { periodInMinutes: 1440 }); // Check once a day

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "checkBackup") {
    chrome.storage.local.get(["settings", "lastBackup"], (result) => {
      const settings = result.settings || {};
      const lastBackup = result.lastBackup || 0;
      const now = Date.now();

      // If auto backup is enabled and it's time for a backup
      if (
        settings.autoBackup &&
        now - lastBackup > settings.backupFrequency * 86400000
      ) {
        // Convert days to ms

        // Get links and create backup
        chrome.storage.local.get(["links"], (data) => {
          const links = data.links || [];
          const backupData = JSON.stringify(links);

          // Store backup in a different storage key
          chrome.storage.local.set({
            backupLinks: links,
            lastBackup: now,
          });

          // Notify user if enabled
          if (settings.notificationsEnabled) {
            chrome.notifications.create({
              type: "basic",
              iconUrl: "icon128.png",
              title: "Backup Complete",
              message: `${links.length} links have been backed up automatically`,
            });
          }
        });
      }
    });
  }
});
