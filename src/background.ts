const tldr = async(text: string) => {
  const summarizer = await ai.summarizer.create({ type: "tl;dr", length: 'short' });
  return await summarizer.summarize(text);
}

const eli5 = async(text: string) => {
  console.log(text);
  const summarizer = await ai.summarizer.create({ type: "tl;dr", tone: 'formal', length: 'medium' , sharedContext: 'The reader is 5 years old'});
  return await summarizer.summarize(text)
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.action === "tldr") {
    tldr(request.text).then((rewrite) => {
      sendResponse({ rewrite });
      console.log(rewrite)
    });
  } else if (request.action === "eli5") {
    eli5(request.text).then((rewrite) => {
      sendResponse({ rewrite });
      console.log(rewrite);
    });
  }
  return true;
});
