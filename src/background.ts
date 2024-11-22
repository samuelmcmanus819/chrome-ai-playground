//If the text is too long to fit in the summarizer, then split it in half first
const initialSummarization = async(text: string) => {
  if (text.length > 6000) {
    const firstHalf = text.slice(0, text.length / 2);
    const secondHalf = text.slice(text.length / 2);
    const initialSummarizer = await ai.summarizer.create({ type: 'tl;dr', length: 'long' });
    const firstHalfText = await initialSummarizer.summarize(firstHalf);
    const secondHalfText = await initialSummarizer.summarize(secondHalf);
    return await initialSummarizer.summarize(firstHalfText + secondHalfText);
  } else { return text }
}

const tldr = async(text: string) => {
  text = await initialSummarization(text);
  const summarizer = await ai.summarizer.create({ type: "tl;dr" });
  return await summarizer.summarize(text);
}

const eli5 = async(text: string) => {
  text = await initialSummarization(text);
  const summarizer = await ai.summarizer.create({ type: "tl;dr", tone: 'formal', length: 'medium' , sharedContext: 'The reader is 5 years old'});
  return await summarizer.summarize(text)
}

const notes = async(text: string) => {
  text = await initialSummarization(text);
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
