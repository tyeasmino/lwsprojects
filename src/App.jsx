import { useState } from 'react';
import './App.css';



function Square({ value, onSquareClick }) {



  return <button className="text-3xl w-12 h-12 m-1 border border-gray-400 bg-white leading-9"
    onClick={onSquareClick}
  > {value} </button>
}


function Board({ xIsNext, squares, onPlay }) {


  const winner = calculateWinner(squares)
  let status;

  if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = "Next Player " + (xIsNext ? "X" : "O");
  }


  function handleClick(i) {
    if (winner || squares[i]) return;
    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = 'X'
    }
    else {
      nextSquares[i] = 'O'
    }

    onPlay(nextSquares);
  }

  return (
    <>

      {status}
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} /> <Square value={squares[4]} onSquareClick={() => handleClick(4)} /> <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} /> <Square value={squares[7]} onSquareClick={() => handleClick(7)} /> <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);

  const [currentMove, setCurrenctMove] = useState(0)
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    setXIsNext(!xIsNext)
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrenctMove(nextHistory.length - 1)
  }

  function jumpTo(move) {
    setCurrenctMove(move)
    setXIsNext(move % 2 === 0)
  }



  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) description = `Go to the move # ${move}`
    else description = 'Go to start the game'

    return (
      <li className='bg-gray-700 text-white mb-1 p-1 rounded-sm' key={move}>
        <button onClick={() => jumpTo(move)} > {description} </button>
      </li>
    )
  })

  return (
    <div className='flex justify-center p-4 '>
      <div className='mr-16'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='p-1 border border-gray-400'>
        <ol className='text-lg'> {moves} </ol>
      </div>
    </div>
  )
}



function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];


  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null
}