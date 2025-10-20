// Background service worker for Google Form Automate extension

chrome.runtime.onInstalled.addListener(() => {
  console.log("Google Form Automate extension installed");
});

// Add event listeners for automation logic, e.g., listening for messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startAutomation") {
    // Logic to start automation
    console.log("Starting automation");
    sendResponse({ status: "started" });
  }
  // Return true to indicate asynchronous response if needed
  return true;
});
