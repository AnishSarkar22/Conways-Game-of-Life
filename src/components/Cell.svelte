<script lang="ts">
  export let isAlive = false;
</script>

<button
  type="button"
  class="cell {isAlive ? 'alive' : ''}"
  on:click
  on:keydown
  aria-label="Toggle cell state">
</button>

<style>
  .cell {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  
  .cell.alive {
    background-color: #3B4852;
  }
</style>