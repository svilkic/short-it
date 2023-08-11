chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    const updatedUrl = tab.url
    chrome.tabs.sendMessage(tabId, { action: 'executeScript', url: updatedUrl })
  }
})

function sendExecuteMessage(message: any) {
  chrome.runtime.sendMessage(message)
}
