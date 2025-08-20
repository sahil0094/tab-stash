document.addEventListener('DOMContentLoaded', () => {
  const newStashNameInput = document.getElementById('new-stash-name');
  const createStashBtn = document.getElementById('create-stash-btn');
  const stashListDiv = document.getElementById('stash-list');
  const stashCurrentBtn = document.getElementById('stash-current-btn');
  const stashAllBtn = document.getElementById('stash-all-btn');

  let activeStash = null;

  function renderStashes() {
    chrome.runtime.sendMessage({ action: 'getStashes' }, (response) => {
      stashListDiv.innerHTML = '';
      if (response && Object.keys(response).length > 0) {
        for (const name in response) {
          const stash = response[name];
          const stashItem = document.createElement('div');
          stashItem.className = 'stash-item';
          stashItem.innerHTML = `
            <div class="stash-header">
              <span class="stash-name">${name}</span>
              <span>${stash.length} tab(s)</span>
            </div>
            <div class="stash-actions">
              <button class="btn-restore" data-stash-name="${name}">Restore</button>
              <button class="btn-bookmark" data-stash-name="${name}">Bookmark</button>
              <button class="btn-delete" data-stash-name="${name}">Delete</button>
            </div>
          `;
          stashListDiv.appendChild(stashItem);
        }
      } else {
        stashListDiv.innerHTML = '<p style="text-align:center;">No stashes yet. Create one!</p>';
      }
    });
  }

  createStashBtn.addEventListener('click', () => {
    const name = newStashNameInput.value.trim();
    if (name) {
      chrome.runtime.sendMessage({ action: 'createStash', name }, () => {
        newStashNameInput.value = '';
        renderStashes();
      });
    }
  });

  stashListDiv.addEventListener('click', (e) => {
    const target = e.target;
    const stashName = target.getAttribute('data-stash-name');

    if (target.classList.contains('btn-restore')) {
      chrome.runtime.sendMessage({ action: 'restoreStash', name: stashName });
    } else if (target.classList.contains('btn-bookmark')) {
      chrome.runtime.sendMessage({ action: 'bookmarkStash', name: stashName }, () => {
        alert(`Stash "${stashName}" saved as a bookmark folder.`);
      });
    } else if (target.classList.contains('btn-delete')) {
      if (confirm(`Are you sure you want to delete the "${stashName}" stash?`)) {
        chrome.runtime.sendMessage({ action: 'deleteStash', name: stashName }, () => {
          renderStashes();
        });
      }
    }
  });
  
  async function getFirstStashName() {
    return new Promise(resolve => {
        chrome.runtime.sendMessage({ action: 'getStashes' }, (response) => {
            if (response && Object.keys(response).length > 0) {
                resolve(Object.keys(response)[0]);
            }
            resolve(null);
        });
    });
  }

  stashCurrentBtn.addEventListener('click', async () => {
      const firstStash = await getFirstStashName();
      if (!firstStash) {
          alert("Please create a stash first.");
          return;
      }
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const tab = tabs[0];
            chrome.runtime.sendMessage({ action: 'stashTabs', name: firstStash, tabs: [tab] }, () => {
                chrome.tabs.remove(tab.id);
                renderStashes();
            });
        }
    });
  });

  stashAllBtn.addEventListener('click', async () => {
      const firstStash = await getFirstStashName();
      if (!firstStash) {
          alert("Please create a stash first.");
          return;
      }
      chrome.tabs.query({ currentWindow: true, pinned: false }, (tabs) => {
        const tabsToStash = tabs.filter(tab => !tab.url.startsWith('chrome://'));
        chrome.runtime.sendMessage({ action: 'stashTabs', name: firstStash, tabs: tabsToStash }, () => {
            const tabIdsToRemove = tabsToStash.map(tab => tab.id);
            chrome.tabs.remove(tabIdsToRemove);
            renderStashes();
        });
    });
  });

  renderStashes();
});
