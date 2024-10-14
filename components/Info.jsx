import React from 'react';
import Head from 'next/head';

const GameOfLifeRules = () => {
  return (
    <>
      <Head>
        <title>Conway's Game of Life Rules</title>
        <meta name="description" content="Rules for Conway's Game of Life" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-8 bg-gray-100 text-gray-800">
        <h1 className="text-4xl font-bold mb-8">Rules</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">For a space that is populated:</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Each cell with one or no neighbors dies, as if by solitude.</li>
            <li>Each cell with four or more neighbors dies, as if by overpopulation.</li>
            <li>Each cell with two or three neighbors survives.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">For a space that is empty or unpopulated:</h2>
          <ul className="list-disc pl-5">
            <li>Each cell with three neighbors becomes populated.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Placeholder for example images */}
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div className="w-20 h-20 bg-gray-300">{/* Before image */}</div>
                <div className="text-2xl">➡️</div>
                <div className="w-20 h-20 bg-gray-300">{/* After image */}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default GameOfLifeRules;