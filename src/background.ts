const chunkSize = 3000;
const getChunks = (text: string) => {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

//If the text is too long to fit in the summarizer,
//then split text into chunks and reduce until they're the correct length
const initialSummarization = async(text: string) => {
  let chunks = getChunks(text);
  let outText = "";
  const initialSummarizer = await ai.summarizer.create({ type: 'tl;dr', length: 'long' });
  while(chunks.length > 1) {
    for (let chunk of chunks) {
      outText += await initialSummarizer.summarize(chunk);
    }
    chunks = getChunks(outText);
    text = outText;
  }
  return text;
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
  const chunks = getChunks(text);
  let outText = "";
  const summarizer = await ai.summarizer.create({ type: "key-points", format: 'plain-text' });
  for (const chunk of chunks) {
    outText += await summarizer.summarize(chunk);
  }

  return outText;
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
