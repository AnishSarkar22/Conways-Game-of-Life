<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { createSlider, melt } from '@melt-ui/svelte';
    import { Play, Pause, RefreshCw, Trash2, Settings, ChevronDown, Info } from 'lucide-svelte';
    
    // Slider setup 
    const {
        elements: { root, range, thumbs },
        states: { value }
    } = createSlider({
        defaultValue: [5],
        min: 1,
        max: 20,
        step: 1
    });

    let grid = $state<boolean[][]>([]);
    let isRunning = $state(false);
    let generation = $state(0);
    let speed = $derived($value[0] || 5);
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let showSettings = $state(false);
    let showInfo = $state(false);

    const rows = 22;
    const cols = 22;

    // Reactive declaration for media query
    let isMobile = $derived(typeof window !== 'undefined' && window.innerWidth < 640);

    const createEmptyGrid = () => {
        return Array(rows)
            .fill(undefined)
            .map(() => Array(cols).fill(false));
    };

    onMount(() => {
        grid = createEmptyGrid();

        // Setup window resize listener for mobile detection
        const handleResize = () => {
            isMobile = window.innerWidth < 640;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    const toggleCell = (i: number, j: number): void => {
        grid = grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (rowIndex === i && colIndex === j ? !cell : cell))
        );
    };

    const clearGrid = () => {
        grid = createEmptyGrid();
        generation = 0;
        isRunning = false;
        if (intervalId) clearInterval(intervalId);
    };

    const randomizeGrid = () => {
        grid = grid.map((row) => row.map(() => Math.random() > 0.7));
        generation = 0;
    };

    const runSimulation = () => {
        if (!isRunning) return;

        grid = grid.map((row, i) =>
            row.map((cell, j) => {
                const neighbors = [
                    [-1, -1], [-1, 0], [-1, 1],
                    [0, -1],           [0, 1],
                    [1, -1],  [1, 0],  [1, 1]
                ].reduce((acc, [x, y]) => {
                    const newI = (i + x + rows) % rows;
                    const newJ = (j + y + cols) % cols;
                    return acc + (grid[newI][newJ] ? 1 : 0);
                }, 0);

                if (cell && (neighbors === 2 || neighbors === 3)) return true;
                if (!cell && neighbors === 3) return true;
                return false;
            })
        );

        generation += 1;
    };

    $effect(() => {
        if (isRunning) {
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(runSimulation, 1000 / speed);
        } else if (intervalId) {
            clearInterval(intervalId);
        }
    });

    onDestroy(() => {
        if (intervalId) clearInterval(intervalId);
    });

    function toggleRunning() {
        isRunning = !isRunning;
    }
    
    function toggleSettings() {
        showSettings = !showSettings;
    }
    
    function toggleInfo() {
        showInfo = !showInfo;
    }
</script>

<div class="min-h-screen bg-[#111827] text-white py-8 px-4 font-sans">
    <div class="container mx-auto max-w-4xl">
        <!-- Header with animated gradient -->
        <header class="mb-8 relative overflow-hidden rounded-xl p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl border border-gray-700/50">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(25,113,233,0.15),transparent_50%)]"></div>
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,235,199,0.15),transparent_50%)]"></div>
            
            <h1 class="text-center text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 drop-shadow-lg">
                Conway's Game of Life
            </h1>
            
            <div class="mt-4 flex items-center justify-center gap-3">
                <div class="px-4 py-2 bg-gray-800/60 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                    <span class="text-gray-400 text-sm mr-1">Generation:</span>
                    <span class="text-cyan-400 font-mono font-semibold">{generation}</span>
                </div>
                
                <button 
                    onclick={toggleInfo}
                    class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700/60 transition"
                >
                    <Info class="h-5 w-5" />
                </button>
            </div>
        </header>

        <!-- Main game container -->
        <div class="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700/50">
            <!-- Game Controls -->
            <div class="p-4 sm:p-5 flex flex-wrap justify-center gap-3 border-b border-gray-700/50 bg-gradient-to-r from-gray-900 to-gray-800">
                <button 
                    onclick={toggleRunning}
                    class={`flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-medium transition-all duration-200 shadow-md ${
                        isRunning 
                            ? 'bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white' 
                            : 'bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white'
                    }`}
                >
                    {#if isRunning}
                        <Pause class="h-4 w-4" />
                        <span>Pause</span>
                    {:else}
                        <Play class="h-4 w-4" />
                        <span>Start</span>
                    {/if}
                </button>

                <button
                    onclick={randomizeGrid}
                    class="flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-medium bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white transition-all duration-200 shadow-md"
                >
                    <RefreshCw class="h-4 w-4" />
                    <span>Randomize</span>
                </button>

                <button
                    onclick={clearGrid}
                    class="flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 font-medium bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white transition-all duration-200 shadow-md"
                >
                    <Trash2 class="h-4 w-4" />
                    <span>Clear</span>
                </button>
                
                <button
                    onclick={toggleSettings}
                    class="flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 bg-gray-800 hover:bg-gray-700 transition-all duration-200 border border-gray-700"
                >
                    <Settings class="h-4 w-4" />
                    <span class="sr-only sm:not-sr-only sm:text-sm sm:font-medium">Settings</span>
                    <ChevronDown class="h-3 w-3 transition-transform" style={showSettings ? 'transform: rotate(180deg)' : ''} />
                </button>
            </div>
            
            <!-- Speed Control (shows when settings are open) -->
            {#if showSettings}
                <div class="p-6 bg-gray-800/50 border-b border-gray-700/50 backdrop-blur-sm">
                    <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        <h3 class="text-sm font-semibold text-gray-200">Simulation Speed</h3>
                        <div class="w-full flex items-center gap-4">
                            <span use:melt={$root} class="relative flex h-6 w-full max-w-md items-center">
                                <span class="h-1.5 w-full rounded-full bg-gray-700 shadow-inner">
                                    <span use:melt={$range} class="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></span>
                                </span>
                                <span
                                    use:melt={$thumbs[0]}
                                    class="block h-5 w-5 rounded-full bg-white shadow-md hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                                ></span>
                            </span>
                            <span class="text-cyan-400 font-mono font-semibold text-lg min-w-[4rem]">{speed} gen/s</span>
                        </div>
                    </div>
                </div>
            {/if}

            <!-- Info panel -->
            {#if showInfo}
                <div class="p-6 bg-gray-800/50 border-b border-gray-700/50 backdrop-blur-sm">
                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold text-cyan-400">How it works</h3>
                        <p class="text-gray-300">Conway's Game of Life is a cellular automaton where cells live or die based on simple rules:</p>
                        <ul class="space-y-2 text-sm text-gray-300">
                            <li class="flex items-start gap-2">
                                <div class="h-5 w-5 rounded-md bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                                <span>Any live cell with 2-3 neighbors survives to the next generation</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <div class="h-5 w-5 rounded-md bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                                <span>Any dead cell with exactly 3 neighbors becomes alive</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <div class="h-5 w-5 rounded-md bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                                <span>All other cells die or remain dead</span>
                            </li>
                        </ul>
                        <p class="text-sm text-gray-400 italic mt-2">Click on cells to toggle between alive and dead states</p>
                    </div>
                </div>
            {/if}

            <!-- Grid -->
            <div class="p-8 bg-gradient-to-b from-gray-800/30 to-gray-900/30 flex justify-center">
                <div
                    class="grid gap-[1px] bg-gray-700/30 rounded-xl overflow-hidden shadow-inner border border-gray-700/30"
                    style="grid-template-columns: repeat({cols}, 1fr); width: 100%; max-width: 550px; aspect-ratio: 1/1;"
                >
                    {#each grid as row, i}
                        {#each row as cell, j}
                            <button
                                class={`w-full h-full transition-colors duration-150 ${
                                    cell 
                                        ? 'bg-gradient-to-br from-blue-400 to-cyan-500 hover:from-blue-300 hover:to-cyan-400 shadow-inner' 
                                        : 'bg-gray-800 hover:bg-gray-700'
                                }`}
                                onclick={() => toggleCell(i, j)}
                                onkeydown={(e) => e.key === 'Enter' && toggleCell(i, j)}
                                aria-label={`Cell ${i}-${j} ${cell ? 'alive' : 'dead'}`}
                            ></button>
                        {/each}
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>