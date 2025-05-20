<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let hoveredCard: number | null = null;
  let mounted = false;

  onMount(() => {
    mounted = true;
  });

  const handleCardClick = (href: string, isExternal: boolean) => {
    if (isExternal) {
      window.location.href = href;
    } else {
      goto(href);
    }
  };

  const cards = [
    { title: "Play", href: "/game", description: "A Web Application which simulates Conway's Game of Life." },
    { title: "Learn", href: "/learn", description: "Read and learn more about the game, its history and its implications." },
    { title: "Source", href: "https://github.com/AnishSarkar22/Conways-Game-of-Life", description: "See the source code behind this application here on Github.", isExternal: true },
    { title: "About", href: "https://github.com/AnishSarkar22", description: "Find out more about the people behind this application.", isExternal: true }
  ];
</script>

<svelte:head>
  <title>Conway's Game of Life</title>
  <link rel="icon" href="/favicon.ico" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="container {mounted ? 'mounted' : ''}">
  <main>
    <h1 class="title">
      Welcome to Conway's<br/><span class="highlight">Game of Life</span>
    </h1>

    <div class="grid">
      {#each cards as card, index}
        <button 
          type="button"
          class="card {hoveredCard === index ? 'hovered' : ''}"
          on:mouseenter={() => hoveredCard = index}
          on:mouseleave={() => hoveredCard = null}
          on:click={() => handleCardClick(card.href, card.isExternal ?? false)}
          on:keydown={(e) => e.key === 'Enter' && handleCardClick(card.href, card.isExternal ?? false)}
        >
        <h3>{card.title} &rarr;</h3>
          <p>{card.description}</p>
        </button>
      {/each}
    </div>
  </main>

  <footer>
    <p>Powered by SvelteKit, Melt UI and Vercel</p>
  </footer>
</div>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
  }

  .container.mounted {
    opacity: 1;
  }

  main {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  .title {
    margin: 2rem 0 2rem;
    line-height: 1.15;
    font-size: 3.3rem;
    font-weight: 700;
    text-align: center;
    color: #e2e8f0;
  }

  .highlight {
    color: #0abd80;
    background: linear-gradient(180deg, rgba(10,189,128,0) 50%, rgba(10,189,128,0.2) 50%);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    width: 100%;
    margin-top: 3.5rem;
  }

  .card {
    padding: 1.5rem;
    text-align: left;
    border-radius: 10px;
    background-color: rgba(31, 41, 55, 0.7);
    border: 1px solid rgba(75, 85, 99, 0.5);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    width: 100%;
    display: block;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), 
                box-shadow 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), 
                background-color 0.3s ease;
  }

  .card.hovered {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
    background-color: rgba(31, 41, 55, 0.85);
  }

  .card h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #0abd80;
  }

  .card p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
  }

  footer {
    width: 100%;
    height: 100px;
    border-top: 1px solid #718096;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }

  footer p {
    font-size: 0.9rem;
    color: #718096;
  }

  @media (max-width: 600px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>