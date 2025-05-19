# Conway's Game of Life

## The rules for [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

1. **Underpopulation**: A live cell with fewer than two live neighbors dies.
2. **Survival**: A live cell with two or three live neighbors remains alive.
3. **Overpopulation**: A live cell with more than three live neighbors dies.
4. **Reproduction**: A dead cell with exactly three live neighbors becomes alive.

## Getting Started

1. To get started with the development server, install all dependencies:

   ```bash
   npm install
   ```

2. Run the server:

   ```bash
   npm run dev
   ```

2. Then, open [http://localhost:5173](http://localhost:5173) in your browser to see the result.

## Game of Life with Python (alternative)

I have also created a python version of Game of Life.

### Prequisites

- Python 3.12
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