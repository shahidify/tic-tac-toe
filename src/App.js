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

const NEXT_TURN = {
  O: "X",
  X: "O"
};
const getInitialState = () => ({
  grid: newTicTacToeGrid(),
  turn: "X"
});

const reducer = (state, action) => {
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
      nextState.turn = NEXT_TURN[turn];

      return nextState;
    }
    default:
      return state;
  }
};

function Game() {
  const [state, dispatch] = React.useReducer(reducer, getInitialState());
  const { grid } = state;

  const handleClick = (x, y) => {
    dispatch({ type: "CLICK", payload: { x, y } });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div>
      <div>
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
