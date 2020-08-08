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

// Deep cloning
const clone = (x) => JSON.parse(JSON.stringify(x));

function genenrateGrid(rows, columns, mapper) {
  return Array(rows)
    .fill()
    .map(() => Array(columns).fill().map(mapper));
}

const newTicTacToeGrid = () => genenrateGrid(3, 3, () => null);

function checkThree(a, b, c) {
  if (!a || !b || !c) return false;
  return a === b && b === c;
}

// const flatten = (arr) => Array.prototype.flat(arr);
const flatten = (arr) => arr.reduce((acc, cur) => [...acc, ...cur], []);
// arr.reduce((acc, cur) => [...acc, ...cur], []);

function checkForWin(flatGrid) {
  const [nw, n, ne, w, c, e, sw, s, se] = flatGrid;

  return (
    checkThree(nw, n, ne) ||
    checkThree(w, c, e) ||
    checkThree(sw, s, se) ||
    checkThree(nw, w, sw) ||
    checkThree(n, c, s) ||
    checkThree(ne, e, se) ||
    checkThree(nw, c, se) ||
    checkThree(ne, c, sw)
  );
}

function checkForDraw(flatGrid) {
  return (
    !checkForWin(flatGrid) &&
    flatGrid.filter(Boolean).length === flatGrid.length
  );
}

const NEXT_TURN = {
  O: "X",
  X: "O"
};
const getInitialState = () => ({
  grid: newTicTacToeGrid(),
  status: "inProgress",
  turn: "X"
});

const reducer = (state, action) => {
  if (state.status === "success" && action.type !== "RESET") {
    return state;
  }
  switch (action.type) {
    case "RESET":
      return getInitialState();

    case "CLICK": {
      const { x, y } = action.payload;
      const { grid, turn } = state;

      if (grid[y][x]) {
        return state;
      }
      const nextState = clone(state);

      nextState.grid[y][x] = turn;
      const flatGrid = flatten(nextState.grid);
      if (checkForWin(flatGrid)) {
        nextState.status = "success";
        return nextState;
      }
      if (checkForDraw(flatGrid)) {
        return getInitialState();
      }
      nextState.turn = NEXT_TURN[turn];
      return nextState;
    }
    default:
      return state;
  }
};

function Game() {
  const [state, dispatch] = React.useReducer(reducer, getInitialState());
  const { grid, status, turn } = state;

  const handleClick = (x, y) => {
    dispatch({ type: "CLICK", payload: { x, y } });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div style={{ display: "inline-block" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div>Next turn: {turn} </div>
        <div>{status === "success" ? `${turn} won!` : null}</div>
        <button onClick={reset} type="button">
          reset
        </button>
      </div>
      <Grid grid={grid} handleClick={handleClick} />
    </div>
  );
}

function Grid({ grid, handleClick }) {
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
            <Cell
              key={`${colIdx}-${rowIdx}`}
              onClick={() => {
                handleClick(colIdx, rowIdx);
              }}
              value={value}
            />
          ))
        )}
      </div>
    </div>
  );
}

function Cell({ onClick, value }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: 100,
        height: 100
      }}
    >
      <button
        style={{
          width: "100%",
          height: "100%"
        }}
        onClick={onClick}
        type="button"
      >
        {value}
      </button>
    </div>
  );
}
