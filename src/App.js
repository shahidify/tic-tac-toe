import React from "react";
import "./styles.css";

export default function App() {
  return (
    <div>
      <header>
        <h1>Tic Tac Toe in React</h1>
      </header>
      <Game />
    </div>
  );
}

function genenrateGrid(rows, columns, mapper) {
  return Array(rows)
    .fill()
    .map(() => Array(columns).fill().map(mapper));
}

const newTicTacToeGrid = () => genenrateGrid(3, 3, () => null);

function Game() {
  const grid = newTicTacToeGrid();
  return (
    <div>
      <Grid grid={grid} />
    </div>
  );
}

function Grid({ grid }) {
  console.log(grid);
  return (
    <div style={{ display: "inline-block" }}>
      <div
        style={{
          backgroundColor: "#444",
          display: "grid",
          gridTemplateRows: `repeat(${grid.length}, 1fr)`,
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
          gridGap: 2
        }}
      >
        {grid.map((row, rowIdx) =>
          row.map((value, colIdx) => (
            <Cell key={`${colIdx}-${rowIdx}`} value={value} />
          ))
        )}
      </div>
    </div>
  );
}

function Cell({ value }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: 100,
        height: 100
      }}
    >
      {value}
    </div>
  );
}
