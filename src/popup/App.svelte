

<script>
  let inputText = '';
  let outputText = '';
  let selectedOption = 'eli5'; // Default selected option
  let parseMode = true;

  const setParseMode = () => {
    parseMode = true;
  }
  const setActiveTabMode = () => {
    parseMode = false;
    activeTabText();
  }
  const handleSummarizationModeChange = () => {
    if (!parseMode) {
      activeTabText();
    }
  }

  // Parse text from manual input
  const parseText = () => {
    chrome.runtime.sendMessage(
      { action: selectedOption, inputText },
      (response) => {
        if (chrome.runtime.lastError) {
          outputText = chrome.runtime.lastError.message;
        } else {
          outputText = response.rewrite;
        }
      }
    )
  }
  //Parse text from active tab
  const activeTabText = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return; // No active tab
    const activeTab = tabs[0];

    // Send a message to the content script
    chrome.tabs.sendMessage(
      activeTab.id,
      { action: "activeTab", type: selectedOption }, // Message payload
      (response) => {
        if (chrome.runtime.lastError) {
          outputText = chrome.runtime.lastError.message;
        } else {
          outputText = response.message;
        }
      }
    );
  })}
</script>

<style>
  .container {
    width: 600px;
    height: 500px;
    margin: 0 auto;
    border: 1px solid #2b912d;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
    background-color: black;
  }

  h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    color: #2b912d;
  }

  .tool-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }

  .data-row {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
  }

  .action-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  select {
    padding: 10px;
    font-size: 16px;
    background-color: black;
    color: gray;
    border: 1px solid gray;
    border-radius: 4px;
    cursor: pointer;
  }

  select option {
    background-color: black;
    color: gray;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: black;
    color: gray;
    border: 1px solid gray;
    border-radius: 4px;
    cursor: pointer;
  }

  .parsed-textarea {
    width: 100%;
    height: 40%;
    font-size: 16px;
    box-sizing: border-box;
    resize: none;
    background-color: black;
    color: gray;
  }

  .active-tab-textarea {
    width: 100%;
    height: 90%;
    margin-top: 20px;
    font-size: 16px;
    box-sizing: border-box;
    resize: none;
    background-color: black;
    color: gray;
  }

</style>

<div class="container">
  <h1>Rewriter Multitool</h1>
  <div class="tool-row">
    <button on:click={setParseMode}>Submit Text</button>
    <button on:click={setActiveTabMode}>Parse Current Tab</button>
  </div>
  {#if parseMode}
  <div class="data-row">
    <textarea
      class="parsed-textarea"
      bind:value={inputText}
      placeholder="Enter your text here..."
    ></textarea>
    <div class="action-row">
      <select bind:value={selectedOption}>
        <option value="eli5">eli5</option>
        <option value="tldr">tl;dr</option>
      </select>
      <button on:click={parseText}>Parse Text</button>
    </div>
    <textarea
      class="parsed-textarea"
      bind:value={outputText}
      placeholder="Parsed text will appear here..."
      readonly
    ></textarea>
  </div>
  {:else}
  <div class="data-row">
    <select bind:value={selectedOption} on:change={handleSummarizationModeChange}>
      <option value="eli5">eli5</option>
      <option value="tldr">tl;dr</option>
    </select>
    <textarea
      bind:value={outputText}
      class="active-tab-textarea"
      placeholder="Parsed text will appear here..."
      readonly
    ></textarea>
  </div>
  {/if}
</div>
