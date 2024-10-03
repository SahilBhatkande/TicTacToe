import React, { useState } from 'react';
import Square from './Square.jsx';

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [Xturn, setXturn] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkwinner = (currentState) => {
    const winnerlogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of winnerlogic) {
      const [a, b, c] = logic;

      if (currentState[a] !== null && currentState[a] === currentState[b] && currentState[a] === currentState[c]) {
        return currentState[a];  // Return the winner ("X" or "O")
      }
    }

    return null;  // No winner yet
  };

  const handleClick = (index) => {
    if (state[index] !== null || winner) return;  // Prevent move if square is filled or if there's a winner

    const copyState = [...state];
    copyState[index] = Xturn ? 'X' : 'O';
    setState(copyState);
    setXturn(!Xturn);

    const result = checkwinner(copyState);
    if (result) {
      setWinner(result);  // Set winner state if there's a winner
    }
  };

  return (
    <div className='board-container' style={{ alignItems: 'center', justifyContent: 'center', margin: '10px' }}>
      {winner ? (
        <div>{winner} won the game!</div>  // Show the winner
      ) : (
        <>
          <div className='board-row'>
            <Square value={state[0]} onClick={() => handleClick(0)} />
            <Square value={state[1]} onClick={() => handleClick(1)} />
            <Square value={state[2]} onClick={() => handleClick(2)} />
          </div>

          <div className='board-row'>
            <Square value={state[3]} onClick={() => handleClick(3)} />
            <Square value={state[4]} onClick={() => handleClick(4)} />
            <Square value={state[5]} onClick={() => handleClick(5)} />
          </div>

          <div className='board-row'>
            <Square value={state[6]} onClick={() => handleClick(6)} />
            <Square value={state[7]} onClick={() => handleClick(7)} />
            <Square value={state[8]} onClick={() => handleClick(8)} />
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
