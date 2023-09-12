chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'scrapeData') {
      fetch('https://www.timeanddate.com/on-this-day/')
        .then(response => response.text())
        .then(html => {
          sendResponse({ html });
        })
        .catch(error => {
          console.error('Failed to scrape data:', error);
        });
    }
    return true;  // Will respond asynchronously.
  });
  