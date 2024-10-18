import React from "react";
import EastRoundedIcon from '@mui/icons-material/EastRounded';

const CELL_SIZE = 35;
const GRID_SIZE = 3;

const CellColors = {
  DEFAULT: "#f0f0f0",
  YELLOW: "yellow",
  ORANGE: "orange",
  GRAY: "gray",
};

const styles = {
  container: {
    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    padding: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    color: "#2D3748",
  },
  contentWrapper: {
    maxWidth: "1200px",
    width: "100%",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
    gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
    gap: "1px",
    backgroundColor: "#ccc",
    width: "fit-content",
    padding: "1px",
  },
  cell: (color = CellColors.DEFAULT) => ({
    width: `${CELL_SIZE}px`,
    height: `${CELL_SIZE}px`,
    backgroundColor: color,
  }),
  rulesSection: {
    flex: "0 0 80%", 
    padding: "10px",
    borderRadius: "8px",
    marginRight: "10px",
    marginLeft: "-100px",

  },
  examplesSection: {
    flex: "0 0 20%", 
    paddingLeft: "20px",
    marginTop: "-10px",
  },
  exampleRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "45px",
  },
  title: {
    fontWeight: "700", 
    textAlign: "center",
    marginBottom: "30px",
  },
  ruleList: {
    listStyleType: "none", 
    padding: 0, 
    lineHeight: "8.5",
    letterSpacing: "0.5px",
  },
};

const RuleList = ({ title, rules }) => (
  <>
    <h2 style={{ marginBottom: "20px", marginTop: title.includes("empty") ? "30px" : "0px" }}>{title}</h2>
    <ul style={styles.ruleList}>
      {rules.map((rule, index) => (
        <li key={index}>• {rule}</li>
      ))}
    </ul>
  </>
);

const Grid = ({ cellColors }) => (
  <div style={styles.grid}>
    {cellColors.map((color, index) => (
      <div key={index} style={styles.cell(color)} />
    ))}
  </div>
);

const Example = ({ before, after, isLastTwo }) => (
  <div style={{
    ...styles.exampleRow,
    marginBottom: isLastTwo ? '70px' : '45px', // Increase space for last two rows
  }}>
    <Grid cellColors={before} />
    <span style={{ fontSize: "20px", margin: "0 15px" }}>
      <EastRoundedIcon />
    </span>
    <Grid cellColors={after} />
  </div>
);

const GameOfLifeRules = () => {
  const populatedRules = [
    "Each cell with one or no neighbors dies, as if by solitude.",
    "Each cell with four or more neighbors dies, as if by overpopulation.",
    "Each cell with two or three neighbors survives.",
  ];

  const emptyRules = [
    "Each cell with three neighbors becomes populated.",
  ];

  const examples = [
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
    },
    {
      before: [CellColors.YELLOW, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.YELLOW, CellColors.GRAY, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.YELLOW],
      after: [CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.YELLOW, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT, CellColors.DEFAULT],
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <h1 style={styles.title}>Rules</h1>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={styles.rulesSection}>
            <RuleList title="For a space that is populated:" rules={populatedRules} />
            <RuleList title="For a space that is empty or unpopulated:" rules={emptyRules} />
          </div>
          <div style={styles.examplesSection}>
            <h2>Examples</h2>
            {examples.map((example, index) => (
              <Example 
                key={index} 
                before={example.before} 
                after={example.after} 
                isLastTwo={index >= examples.length - 2} // Pass true for last two examples
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOfLifeRules;