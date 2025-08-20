// Core functions for managing stashes in chrome.storage.local

async function getStashes() {
  const result = await chrome.storage.local.get('stashes');
  return result.stashes || {};
}

async function saveStashes(stashes) {
  await chrome.storage.local.set({ stashes });
}

// Background script message listener

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    const stashes = await getStashes();

    switch (request.action) {
      case 'getStashes':
        sendResponse(stashes);
        break;

      case 'createStash':
        if (request.name && !stashes[request.name]) {
          stashes[request.name] = [];
          await saveStashes(stashes);
        }
        sendResponse({ success: true });
        break;

      case 'stashTabs':
        if (request.name && stashes[request.name] && request.tabs) {
          const tabsToStore = request.tabs.map(tab => ({ url: tab.url, title: tab.title }));
          stashes[request.name].push(...tabsToStore);
          await saveStashes(stashes);
        }
        sendResponse({ success: true });
        break;

      case 'restoreStash':
        if (request.name && stashes[request.name]) {
          const tabsToCreate = stashes[request.name];
          for (const tab of tabsToCreate) {
            chrome.tabs.create({ url: tab.url });
          }
        }
        sendResponse({ success: true });
        break;

      case 'deleteStash':
        if (request.name && stashes[request.name]) {
          delete stashes[request.name];
          await saveStashes(stashes);
        }
        sendResponse({ success: true });
        break;

      case 'bookmarkStash':
        if (request.name && stashes[request.name]) {
          const stashContent = stashes[request.name];
          const folder = await chrome.bookmarks.create({
            title: `Stash - ${request.name}`
          });
          for (const tab of stashContent) {
            await chrome.bookmarks.create({
              parentId: folder.id,
              title: tab.title,
              url: tab.url
            });
          }
        }
        sendResponse({ success: true });
        break;
    }
  })();
  return true; // Indicates that the response is sent asynchronously
});

// Context Menu (Right-click) functionality

// Update context menu when stashes change
chrome.storage.onChanged.addListener(async (changes, area) => {
    if (area === 'local' && changes.stashes) {
        updateContextMenu();
    }
});


async function updateContextMenu() {
    await chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
        id: 'stash-tab-parent',
        title: 'Stash Tab To...',
        contexts: ['page']
    });
    const stashes = await getStashes();
    for (const name in stashes) {
        chrome.contextMenus.create({
            id: `stash-to-${name}`,
            parentId: 'stash-tab-parent',
            title: name,
            contexts: ['page']
        });
    }
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const stashes = await getStashes();
  const stashName = info.menuItemId.replace('stash-to-', '');

  if (stashes[stashName]) {
      stashes[stashName].push({ url: tab.url, title: tab.title });
      await saveStashes(stashes);
      chrome.tabs.remove(tab.id);
  }
});

// Initial setup
updateContextMenu();
