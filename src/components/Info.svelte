<script lang="ts">
  const CELL_SIZE = 35;
  const GRID_SIZE = 3;

  const CellColors = {
    DEFAULT: "#1f2937", // Dark background for cells
    YELLOW: "#fbbf24", // Amber color for live cells
    ORANGE: "#f59e0b", // Orange color for center cell
    GRAY: "#6b7280", // Gray for dead cells
  };

  const populatedRules = [
    "Each cell with one or no neighbors dies, as if by solitude.",
    "Each cell with four or more neighbors dies, as if by overpopulation.",
    "Each cell with two or three neighbors survives.",
  ];

  const emptyRules = [
    "Each cell with three neighbors becomes populated.",
  ];

  // First 3 examples relate to populated rules
  const populatedExamples = [
    {
      before: [CellColors.YELLOW, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.ORANGE, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT],
      after: [CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.GRAY, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT],
    },
    {
      before: [CellColors.YELLOW, CellColors.DEFAULT, CellColors.YELLOW, CellColors.YELLOW, CellColors.YELLOW, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.YELLOW, CellColors.YELLOW],
      after: [CellColors.YELLOW, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.YELLOW, CellColors.GRAY, CellColors.DEFAULT, CellColors.YELLOW, CellColors.YELLOW, CellColors.YELLOW],
    },
    {
      before: [CellColors.YELLOW, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.YELLOW, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.YELLOW, CellColors.DEFAULT],
      after: [CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.YELLOW, CellColors.YELLOW, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT],
    }
  ];

  // Last example relates to empty/unpopulated rule
  const emptyExamples = [
    {
      before: [CellColors.YELLOW, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.YELLOW, CellColors.GRAY, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.YELLOW],
      after: [CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.YELLOW, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT],
    }
  ];
</script>

<div class="min-h-screen bg-[#111827] text-white py-8 px-4 font-sans">
  <div class="container mx-auto max-w-4xl">
    <!-- Header with animated gradient -->
    <header class="mb-8 relative overflow-hidden rounded-xl p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl border border-gray-700/50">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(25,113,233,0.15),transparent_50%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,235,199,0.15),transparent_50%)]"></div>
      
      <h1 class="text-center text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 drop-shadow-lg">
        Rules
      </h1>
    </header>

    <div class="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700/50 p-6">
      <!-- Populated Rules Section -->
      <div class="mb-10">
        <h2 class="text-2xl font-semibold mb-6 text-cyan-400">For a space that is populated:</h2>
        
        <!-- Desktop Layout -->
        <div class="hidden sm:grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ul class="space-y-4 text-gray-300">
              {#each populatedRules as rule}
                <li class="flex items-start gap-2">
                  <div class="h-5 w-5 rounded-md bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">•</div>
                  <span>{rule}</span>
                </li>
              {/each}
            </ul>
          </div>
          
          <div>
            <h3 class="text-cyan-400 text-xl mb-4">Examples</h3>
            <div class="space-y-10">
              {#each populatedExamples as example, index}
                <div class="flex items-center justify-center sm:justify-start space-x-6">
                  <!-- Before Grid -->
                  <div class="grid grid-cols-3 gap-[1px] bg-gray-700 p-[1px] rounded shadow-md">
                    {#each example.before as color, i}
                      <div class="w-[35px] h-[35px]" style="background-color: {color};"></div>
                    {/each}
                  </div>
                  
                  <!-- Arrow -->
                  <div class="text-cyan-400 text-xl">→</div>
                  
                  <!-- After Grid -->
                  <div class="grid grid-cols-3 gap-[1px] bg-gray-700 p-[1px] rounded shadow-md">
                    {#each example.after as color, i}
                      <div class="w-[35px] h-[35px]" style="background-color: {color};"></div>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
        
        <!-- Mobile Layout -->
        <div class="sm:hidden">
          <ul class="space-y-4 text-gray-300 mb-6">
            {#each populatedRules as rule}
              <li class="flex items-start gap-2">
                <div class="h-5 w-5 rounded-md bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">•</div>
                <span>{rule}</span>
              </li>
            {/each}
          </ul>
          
          <h3 class="text-cyan-400 text-xl mb-4">Examples</h3>
          <div class="space-y-10 flex flex-col items-center">
            {#each populatedExamples as example, index}
              <div class="flex flex-col items-center space-y-3">
                <!-- Before Grid -->
                <div class="grid grid-cols-3 gap-[1px] bg-gray-700 p-[1px] rounded shadow-md">
                  {#each example.before as color, i}
                    <div class="w-[30px] h-[30px]" style="background-color: {color};"></div>
                  {/each}
                </div>
                
                <!-- Arrow -->
                <div class="text-cyan-400 text-xl">↓</div>
                
                <!-- After Grid -->
                <div class="grid grid-cols-3 gap-[1px] bg-gray-700 p-[1px] rounded shadow-md">
                  {#each example.after as color, i}
                    <div class="w-[30px] h-[30px]" style="background-color: {color};"></div>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
      
      <!-- Empty Rules Section -->
      <div class="mt-12">
        <h2 class="text-2xl font-semibold mb-6 text-cyan-400">For a space that is empty or unpopulated:</h2>
        
        <!-- Desktop Layout -->
        <div class="hidden sm:grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ul class="space-y-4 text-gray-300">
              {#each emptyRules as rule}
                <li class="flex items-start gap-2">
                  <div class="h-5 w-5 rounded-md bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">•</div>
                  <span>{rule}</span>
                </li>
              {/each}
            </ul>
          </div>
          
          <div>
            <h3 class="text-cyan-400 text-xl mb-4">Examples</h3>
            <div class="space-y-10">
              {#each emptyExamples as example, index}
                <div class="flex items-center justify-center sm:justify-start space-x-6">
                  <!-- Before Grid -->
                  <div class="grid grid-cols-3 gap-[1px] bg-gray-700 p-[1px] rounded shadow-md">
                    {#each example.before as color, i}
                      <div class="w-[35px] h-[35px]" style="background-color: {color};"></div>
                    {/each}
                  </div>
                  
                  <!-- Arrow -->
                  <div class="text-cyan-400 text-xl">→</div>
                  
                  <!-- After Grid -->
                  <div class="grid grid-cols-3 gap-[1px] bg-gray-700 p-[1px] rounded shadow-md">
                    {#each example.after as color, i}
                      <div class="w-[35px] h-[35px]" style="background-color: {color};"></div>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
        
        <!-- Mobile Layout -->
        <div class="sm:hidden">
          <ul class="space-y-4 text-gray-300 mb-6">
            {#each emptyRules as rule}
              <li class="flex items-start gap-2">
                <div class="h-5 w-5 rounded-md bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">•</div>
                <span>{rule}</span>
              </li>
            {/each}
          </ul>
          
          <h3 class="text-cyan-400 text-xl mb-4">Examples</h3>
          <div class="flex justify-center">
            {#each emptyExamples as example, index}
              <div class="flex flex-col items-center space-y-3">
                <!-- Before Grid -->
                <div class="grid grid-cols-3 gap-[1px] bg-gray-700 p-[1px] rounded shadow-md">
                  {#each example.before as color, i}
                    <div class="w-[30px] h-[30px]" style="background-color: {color};"></div>
                  {/each}
                </div>
                
                <!-- Arrow -->
                <div class="text-cyan-400 text-xl">↓</div>
                
                <!-- After Grid -->
                <div class="grid grid-cols-3 gap-[1px] bg-gray-700 p-[1px] rounded shadow-md">
                  {#each example.after as color, i}
                    <div class="w-[30px] h-[30px]" style="background-color: {color};"></div>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>