import { Readability } from "@mozilla/readability";

const requestRewrite = async(inputText: string, type: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ action: type, text: inputText }, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message); // Handle potential errors
        } else {
          resolve(response.rewrite); // Resolve the promise with the rewrite value
        }
      });
    });
  };

const extractPageContent = () => {
    const article = new Readability(document.cloneNode(true) as Document).parse();
    return article ? article.textContent : null;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(extractPageContent()!)
    requestRewrite(extractPageContent()!, message.type).then((response) => {
        console.log(response);
        sendResponse({ status: "success", message: response });
    })
    return true;
});
