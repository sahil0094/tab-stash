# Tab-Stash: A Chrome Extension for Focused Research

Tab-Stash is a lightweight and powerful Chrome extension designed to help you manage browser tab clutter during intense research or coding sessions. It provides a simple way to save, group, and restore tab sessions, allowing you to maintain focus and keep your workspace clean.

![Tab-Stash Screenshot](https://i.imgur.com/your-screenshot-url.png)  
*Note: You can take a screenshot of the popup and replace the URL above to have an image in your README.*

---

## The Problem

We've all been there. You start a research session, and within an hour, you have 50-100+ tabs open. Your browser slows down, you can't find the information you need, and the visual clutter destroys your concentration. Tab-Stash was built to solve this exact problem.

## Key Features

*   **Create Stashes:** Group your tabs into named sessions or "stashes" for different projects.
*   **One-Click Stashing:** Save the current tab or all tabs in a window to a stash instantly.
*   **Context Menu Integration:** Right-click on any page to quickly send it to a specific stash.
*   **Restore Sessions:** Restore all tabs from a stash with a single click.
*   **Archive as Bookmarks:** Save an entire stash as a permanent, organized folder in your Chrome Bookmarks.

## Why Tab-Stash? (Beyond Chrome's Tab Groups)

While Chrome's built-in "Tab Groups" feature is great for organizing currently active tabs, Tab-Stash goes a step further by focusing on **session management and archiving**.

*   **Free Up Resources:** Tab groups keep tabs active. Tab-Stash closes the tabs and saves them, freeing up your computer's memory.
*   **Permanent Archiving:** The key difference is the ability to save an entire research session as a bookmark folder. This creates a permanent, organized record of your work that you can come back to weeks or months later, long after the project is done.

## Installation

Since this is a custom-developed extension, you can load it directly into Chrome using the following steps:

1.  Download or clone this repository to your local machine.
2.  Open Google Chrome and navigate to `chrome://extensions`.
3.  In the top-right corner, enable **"Developer mode"**.
4.  Click the **"Load unpacked"** button that appears on the top-left.
5.  Select the directory where you saved this project's files.

That's it! The Tab-Stash extension will now be active in your browser.

## How to Use

1.  **Create a Stash:**
    *   Click the Tab-Stash icon in your toolbar.
    *   Type a name for your new stash and click "Create".

2.  **Stash a Tab:**
    *   **Method 1 (Recommended):** Right-click on the page you want to save, hover over "Stash Tab To...", and select the destination stash.
    *   **Method 2 (Quick Save):** From the popup, click "Stash Current Tab" to save it to the first stash in your list.

3.  **Manage Your Stashes:**
    *   Open the popup to see all your stashes.
    *   Click **"Restore"** to open all tabs from a stash.
    *   Click **"Bookmark"** to save the stash as a permanent bookmark folder.
    *   Click **"Delete"** to remove the stash.

---

### A Note on Development

This project was created as a demonstration of rapid tool development using modern AI. The entire working Chrome extension—including its HTML, CSS, and JavaScript logic—was generated in approximately 15 minutes through a conversation with the **Gemini CLI**.

This approach highlights a shift in development, where functional tools can be prototyped and built in a fraction of the time by leveraging advanced conversational AI.

## License

This project is open-source and available under the [MIT License](LICENSE).
