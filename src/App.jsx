import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from './winning-combinations.js' 

const PLAYER = {
  X : 'Player 1',
  O : 'Player 2'
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
};

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSqureSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSqureSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSqureSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSqureSymbol &&
      firstSqureSymbol === secondSqureSymbol &&
      firstSqureSymbol === thirdSqureSymbol
    ) {
      winner = players[firstSqureSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYER);

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  
  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];

      return updatedTurns;
    });
  }

  function handleRestart()
  {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName
      }
    })
  }

  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName= {PLAYER.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange = {handlePlayerNameChange}
          />
          <Player
            initialName= {PLAYER.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange = {handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
