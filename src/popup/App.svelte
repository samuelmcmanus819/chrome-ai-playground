<script>
  let inputText = '';
  let outputText = '';
  let selectedOption = 'eli5'; // Default selected option

  // Simulate parsing logic
  function parseText() {
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
</script>

<style>
  .container {
    width: 600px;
    height: 500px;
    margin: 0 auto;
    border: 1px solid #2b912d;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

  textarea {
    width: 100%;
    height: 40%;
    font-size: 16px;
    padding: 10px;
    box-sizing: border-box;
    resize: none;
    background-color: black;
    color: gray;
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
</style>

<div class="container">
  <h1>Rewriter Multitool</h1>
  <textarea
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
    bind:value={outputText}
    placeholder="Parsed text will appear here..."
    readonly
  ></textarea>
</div>
