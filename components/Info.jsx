import React from "react";
import EastIcon from "@mui/icons-material/East";

const Home = () => {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 50px)",
    gridTemplateRows: "repeat(3, 50px)",
    gap: "1px",
    backgroundColor: "#ccc",
    width: "fit-content",
    padding: "1px",
  };

  const cellStyle = {
    width: "50px",
    height: "50px",
    backgroundColor: "#f0f0f0",
  };

  const yellowCellStyle = {
    ...cellStyle,
    backgroundColor: "yellow",
  };
  const orangeCellStyle = {
    ...cellStyle,
    backgroundColor: "orange",
  };
  const grayCellStyle = {
    ...cellStyle,
    backgroundColor: "gray",
  };
  const fontFamilyStyle = {
    fontFamily:
      "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  };

  return (
    <div
      style={{
        ...fontFamilyStyle,
        padding: "20px",
        width: "100%",
      }}
    >
      <h1 style={{ fontWeight: "700" }}>Rules</h1>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {/* Rules Section */}
        <div style={{ 
          flex: "0 0 45%", 
          padding: "10px", 
          borderRadius: "8px",
          marginRight: "10px"
        }}>
          <h2 style={{ marginBottom: "20px" }}>For a space that is populated:</h2>
          <ul style={{ listStyleType: "none", padding: 0, lineHeight: "1.8" }}>
            <li>• Each cell with one or no neighbors dies, as if by solitude.</li>
            <li>• Each cell with four or more neighbors dies, as if by overpopulation.</li>
            <li>• Each cell with two or three neighbors survives.</li>
          </ul>

          <h2 style={{ marginTop: "30px", marginBottom: "20px" }}>For a space that is empty or unpopulated:</h2>
          <ul style={{ listStyleType: "none", padding: 0, lineHeight: "1.8" }}>
            <li>• Each cell with three neighbors becomes populated.</li>
          </ul>
        </div>


        {/* Examples Section */}

        <div style={{ marginLeft: "100px", marginTop: "-70px", width: "100%" }}>
          <h2>Examples</h2>
          <div>
            {/* Our new 3x3 grid example */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                width: "10%", 
    height: "10%",
              }}
            >
              <div style={gridStyle}>
                <div style={yellowCellStyle}></div>
                <div style={cellStyle}></div>
                <div style={cellStyle}></div>
                <div style={cellStyle}></div>
                <div style={orangeCellStyle}></div>
                <div style={cellStyle}></div>
                <div style={cellStyle}></div>
                <div style={cellStyle}></div>
                <div style={cellStyle}></div>
              </div>
              <span style={{ fontSize: "20px", margin: "0 15px" }}>
                <EastIcon />
              </span>
              <div style={gridStyle}>
                <div style={cellStyle}></div>
                <div style={cellStyle}></div>
                <div style={cellStyle}></div>
                <div style={cellStyle}></div>
                <div style={grayCellStyle}></div>
                <div style={cellStyle}></div>
                <div style={cellStyle}></div>
                <div style={cellStyle}></div>
                <div style={cellStyle}></div>
              </div>
            </div>

            {/* Existing examples */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div style={gridStyle}>
                <div style={yellowCellStyle} />
                <div style={cellStyle} />
                <div style={yellowCellStyle} />
                <div style={yellowCellStyle} />
                <div style={yellowCellStyle} />
                <div style={cellStyle} />
                <div style={cellStyle} />
                <div style={yellowCellStyle} />
                <div style={yellowCellStyle} />
              </div>
              <span style={{ fontSize: "20px", margin: "0 15px" }}>
                <EastIcon />
              </span>
              <div style={gridStyle}>
                <div style={yellowCellStyle} />
                <div style={cellStyle} />
                <div style={cellStyle} />
                <div style={yellowCellStyle} />
                <div style={grayCellStyle} />
                <div style={cellStyle} />
                <div style={yellowCellStyle} />
                <div style={yellowCellStyle} />
                <div style={yellowCellStyle} />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div style={gridStyle}>
                <div style={yellowCellStyle} />
                <div style={cellStyle} />
                <div style={cellStyle} />
                <div style={cellStyle} />
                <div style={yellowCellStyle} />
                <div style={cellStyle} />
                <div style={cellStyle} />
                <div style={yellowCellStyle} />
                <div style={cellStyle} />
              </div>
              <span style={{ fontSize: "20px", margin: "0 15px" }}>
                <EastIcon />
              </span>
              <div style={gridStyle}>
                <div style={cellStyle} />
                <div style={cellStyle} />
                <div style={cellStyle} />
                <div style={yellowCellStyle} />
                <div style={yellowCellStyle} />
                <div style={cellStyle} />
                <div style={cellStyle} />
                <div style={cellStyle} />
                <div style={cellStyle} />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div style={gridStyle}>
                <div style={yellowCellStyle} />
                <div style={cellStyle} />
                <div style={cellStyle} />
                <div style={yellowCellStyle} />
                <div style={grayCellStyle} />
                <div style={cellStyle} />
                <div style={cellStyle} />
                <div style={cellStyle} />
                <div style={yellowCellStyle} />
              </div>
              <span style={{ fontSize: "20px", margin: "0 15px" }}>
                <EastIcon />
              </span>
              <div style={gridStyle}>
                <div style={cellStyle} />
                <div style={cellStyle} />
                <div style={cellStyle} />
                <div style={cellStyle} />
                <div style={yellowCellStyle} />
                <div style={cellStyle} />
                <div style={cellStyle} />
                <div style={cellStyle} />
                <div style={cellStyle} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
