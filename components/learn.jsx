import Head from 'next/head';

export default function GameOfLife() {
  return (
    <div>
      <Head>
        <title>Conway's Game of Life</title>
        <meta name="description" content="Learn about Conway's Game of Life" />
      </Head>

      <main>
        <h1>Conway's Game of Life</h1>
        <p>
          Conway's Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, with no further input required.
        </p>

        <h2>How it Works</h2>
        <p>
          The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states: live or dead. Every cell interacts with its eight neighbors, which are the cells that are horizontally, vertically, or diagonally adjacent.
        </p>

        <h2>The Rules</h2>
        <ul>
          <li>Any live cell with two or three live neighbors survives.</li>
          <li>Any dead cell with exactly three live neighbors becomes a live cell.</li>
          <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
        </ul>

        <h2>Behavior and Patterns</h2>
        <p>
          The patterns in Conway's Game of Life evolve over time and may exhibit various behaviors such as:
        </p>
        <ul>
          <li>**Still lifes**: Stable patterns that do not change.</li>
          <li>**Oscillators**: Patterns that return to their initial state after a fixed number of steps.</li>
          <li>**Spaceships**: Patterns that translate themselves across the grid.</li>
        </ul>

        <h2>Notable Examples</h2>
        <ul>
          <li>**Glider**: A small pattern that moves diagonally across the grid.</li>
          <li>**Blinker**: An oscillator that switches between two states.</li>
          <li>**Toad**: Another simple oscillator.</li>
        </ul>
      </main>

      <style jsx>{`
        main {
          padding: 2rem;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        h2 {
          font-size: 1.8rem;
          margin-top: 1.5rem;
        }
        p {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        ul {
          margin-left: 1.5rem;
        }
      `}</style>
    </div>
  );
}