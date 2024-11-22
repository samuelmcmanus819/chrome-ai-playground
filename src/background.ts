const tldr = async(text: string) => {
  if (text.length > 6000) {
    const initialSummarizer = await ai.summarizer.create({ type: "tl;dr", length: 'long' });
    text = await initialSummarizer.summarize(text);
  }
  const summarizer = await ai.summarizer.create({ type: "tl;dr" });
  return await summarizer.summarize(text);
}

const eli5 = async(text: string) => {
  if (text.length > 6000) {
    const initialSummarizer = await ai.summarizer.create({ type: "tl;dr", length: 'long' });
    text = await initialSummarizer.summarize(text);
  }
  const summarizer = await ai.summarizer.create({ type: "tl;dr", tone: 'formal', length: 'medium' , sharedContext: 'The reader is 5 years old'});
  return await summarizer.summarize(text)
}

const notes = async(text: string) => {
  if (text.length > 6000) {
    const initialSummarizer = await ai.summarizer.create({ type: "tl;dr", length: 'long' });
    text = await initialSummarizer.summarize(text);
  }
  const summarizer = await ai.summarizer.create({ type: "key-points", format: 'plain-text' });
  return await summarizer.summarize(text)
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "tldr") {
    tldr(request.text).then((rewrite) => {
      sendResponse({ rewrite });
    });
  } else if (request.action === "eli5") {
    eli5(request.text).then((rewrite) => {
      sendResponse({ rewrite });
      console.log(rewrite);
    });
  } else if (request.action === "notes") {
    notes(request.text).then((rewrite) => {
      sendResponse({ rewrite });
    });
  }
  return true;
});
