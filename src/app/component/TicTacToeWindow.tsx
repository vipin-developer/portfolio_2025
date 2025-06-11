import React, { useState } from "react";

const emptyBoard = Array(9).fill(null);

function checkWinner(board: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

const TicTacToeWindow = React.memo(() => {
  const [board, setBoard] = useState<(string | null)[]>([...emptyBoard]);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = checkWinner(board);
  const isDraw = !winner && board.every(cell => cell);

  function handleClick(idx: number) {
    if (board[idx] || winner) return;
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setBoard([...emptyBoard]);
    setXIsNext(true);
  }

  return (
    <div className="flex flex-col items-center justify-center h-[260px] w-[260px] select-none">
      <h3 className="text-cyan-400 font-bold text-lg mb-2">Tic Tac Toe</h3>
      <div className="grid grid-cols-3 grid-rows-3 gap-1 mb-3">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className="w-16 h-16 bg-black/60 border-2 border-cyan-400/40 text-2xl font-bold text-cyan-200 hover:bg-cyan-400/10 transition-all rounded flex items-center justify-center shadow-[0_0_8px_0_rgba(0,255,255,0.15)]"
            style={{ cursor: cell || winner ? "not-allowed" : "pointer" }}
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="mb-2 text-cyan-300 text-sm min-h-[24px]">
        {winner ? (
          <span className="text-green-400 font-bold">{winner} wins!</span>
        ) : isDraw ? (
          <span className="text-yellow-400 font-bold">Draw!</span>
        ) : (
          <span>Turn: <span className="text-cyan-200 font-mono">{xIsNext ? "X" : "O"}</span></span>
        )}
      </div>
      <button
        onClick={reset}
        className="px-4 py-1 bg-cyan-700/80 text-white rounded hover:bg-cyan-500/80 transition-all text-xs border border-cyan-400/40"
      >
        Reset
      </button>
    </div>
  );
});

export default TicTacToeWindow; 