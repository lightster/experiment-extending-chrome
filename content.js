console.log("Hello from my Chrome extension")

$('body').append('<div style="position: fixed; bottom: 0; right: 0; width: 100px; height: 75px; "><iframe src="https://chrome.m.com" frameborder="0" style="border: 0; width: 100%; height: 200px"></iframe></div>');

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
