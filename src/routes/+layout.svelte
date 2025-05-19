<script lang="ts">
    import '../app.css';

    let { children } = $props();
</script>

{@render children()}

<style>
  :global(body) {
    font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
    padding: 20px 20px 60px;
    max-width: 680px;
    margin: 0 auto;
    background-color: #111827; /* Dark background with matching game theme */
    color: white; /* Text color */
  }

  :global(.Board) {
    position: relative;
    margin: 0 auto;
    background-color: #000;
  }
  
  :global(html) {
    background-color: #111827;
  }
</style>