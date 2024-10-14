import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Typography,
  Slider,
  Container,
  Paper,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { PlayArrow, Stop, Clear, Shuffle } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3B4852",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily:
      "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
});

const Cell = ({ isAlive, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      width: "100%",
      paddingBottom: "100%",
      backgroundColor: isAlive ? "primary.main" : "white",
      border: "1px solid #ccc",
      cursor: "pointer",
    }}
  />
);

const GameOfLife = () => {
  const [grid, setGrid] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(5); // Speed in generations per second

  const rows = 22;
  const cols = 22;

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const createEmptyGrid = () => {
    return Array(rows)
      .fill()
      .map(() => Array(cols).fill(false));
  };

  useEffect(() => {
    setGrid(createEmptyGrid());
  }, []);

  const toggleCell = (i, j) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        rowIndex === i && colIndex === j ? !cell : cell
      )
    );
    setGrid(newGrid);
  };

  const clearGrid = () => {
    setGrid(createEmptyGrid());
    setGeneration(0);
    setIsRunning(false);
  };

  const randomizeGrid = () => {
    const newGrid = grid.map((row) => row.map(() => Math.random() > 0.7));
    setGrid(newGrid);
    setGeneration(0);
  };

  const runSimulation = useCallback(() => {
    if (!isRunning) return;

    setGrid((g) => {
      const newGrid = g.map((row, i) =>
        row.map((cell, j) => {
          const neighbors = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
          ].reduce((acc, [x, y]) => {
            const newI = (i + x + rows) % rows;
            const newJ = (j + y + cols) % cols;
            return acc + (g[newI][newJ] ? 1 : 0);
          }, 0);

          if (neighbors < 2 || neighbors > 3) return false;
          if (neighbors === 3) return true;
          return g[i][j];
        })
      );

      return newGrid;
    });

    setGeneration((gen) => gen + 1);
  }, [isRunning]);

  useEffect(() => {
    const interval = setInterval(runSimulation, 1000 / speed);
    return () => clearInterval(interval);
  }, [runSimulation, speed]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Paper
          elevation={2}
          sx={{
            p: isMobile ? 2 : 3,
            mt: isMobile ? 2 : 4,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            gutterBottom
            align="center"
            marginTop={2}
            sx={{
              fontFamily: theme.typography.fontFamily,
              color: "#2D3748",
              fontSize: "2rem",
              fontWeight: 700, // Added font weight
              textAlign: "center",
            }}
          >
            Game of Life
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              align="center"
              sx={{
                fontFamily: theme.typography.fontFamily,
                color: "#2D3748",
                fontWeight: 450,
              }}
            >
              Speed: {speed} generations/second
            </Typography>
            <Slider
              value={speed}
              onChange={(_, newValue) => setSpeed(newValue)}
              min={1}
              max={10}
              step={1}
              marks
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value} gen/s`}
              sx={{
                color: "#3B4852",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              gap: isMobile ? 1 : 2,
              mb: 2,
            }}
          >
            <Button
              fullWidth={isMobile}
              variant="contained"
              color="primary"
              startIcon={isRunning ? <Stop /> : <PlayArrow />}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? "Stop" : "Start"}
            </Button>
            <Button
              fullWidth={isMobile}
              variant="outlined"
              startIcon={<Clear />}
              onClick={clearGrid}
            >
              Clear
            </Button>
            <Button
              fullWidth={isMobile}
              variant="outlined"
              startIcon={<Shuffle />}
              onClick={randomizeGrid}
            >
              Randomize
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: isMobile ? 2 : 4,
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap: 0,
                width: "100%",
                maxWidth: isMobile ? "100%" : "440px", // 22 * 20px
              }}
            >
              {grid.map((row, i) =>
                row.map((cell, j) => (
                  <Cell
                    key={`${i}-${j}`}
                    isAlive={cell}
                    onClick={() => toggleCell(i, j)}
                  />
                ))
              )}
            </Box>
          </Box>
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontFamily: theme.typography.fontFamily,
              color: "#2D3748",
              mt: 2,
              fontWeight: 450,
            }}
          >
            Generation: {generation}
          </Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default GameOfLife;
