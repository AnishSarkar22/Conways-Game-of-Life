# Conway's Game of Life

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). This also uses [Material UI](https://github.com/mui/material-ui).

## The rules for [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

1. **Underpopulation**: A live cell with fewer than two live neighbors dies.
2. **Survival**: A live cell with two or three live neighbors remains alive.
3. **Overpopulation**: A live cell with more than three live neighbors dies.
4. **Reproduction**: A dead cell with exactly three live neighbors becomes alive.

## Getting Started

1. To get started with the development server, run the following commands:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

2. Then, open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
3. You can start editing the page by modifying `pages/index.jsx`. The page auto-updates as you edit the file.
