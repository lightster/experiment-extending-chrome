console.log("Hello from my Chrome extension")

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      chrome.runtime.sendMessage({
        "message": "open_new_tab",
        "url": location.href
      })
    }
  }
)
