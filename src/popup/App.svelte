<script>
  let count = 0;
</script>

<style>
  h1 {
    color: #333;
  }
</style>

<div>
  <h1>Hello, Svelte Chrome Extension!</h1>
  <p>Count: {count}</p>
  <button on:click={() => count++}>Increment</button>
</div>