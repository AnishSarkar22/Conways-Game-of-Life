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

## Game of Life with Python

I have also created a python version of Game of Life.

### Prequisites

- Python 3.x
- `venv` module (usually included with Python 3.x)

### Setting Up the Virtual Environment

1. **Create a virtual environment:**

   ```bash
   python -m venv venv
   ```

2. **Activate the virtual environment:**

   - On Windows:

     ```bash
     .\venv\Scripts\activate
     ```

   - On macOS and Linux:

     ```bash
     source venv/bin/activate
     ```

3. **Install the required packages:**

   ```bash
   pip install pygame
   ```

### Running the Game

1. **Ensure the virtual environment is activated.**

2. Run main.py file

    ```bash
    python main.py
    ```

### Deactivating the Virtual Environment

To deactivate the virtual environment, simply run:

```bash
deactivate
```
