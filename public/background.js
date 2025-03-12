// Background script for the Chrome extension

// Create context menu item when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveToAirdropLinker",
    title: "Save to Airdrop Linker",
    contexts: ["link"],
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
  }
});

// Function to save a link
function saveLink(url, title) {
  // Get existing links from storage
  chrome.storage.local.get(["links"], (result) => {
    const links = result.links || [];

    // Create a new link object
    const newLink = {
      id: Date.now().toString(),
      url: url,
      title: title,
      tags: ["new"],
      createdAt: new Date().toISOString(),
    };

    // Add the new link to the array
    links.push(newLink);

    // Save the updated links array back to storage
    chrome.storage.local.set({ links: links }, () => {
      // Show a notification
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon128.png",
        title: "Link Saved",
        message: `"${title}" has been saved to Airdrop Linker`,
      });
    });
  });
}
