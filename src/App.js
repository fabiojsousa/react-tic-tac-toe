import React, { useState, useEffect } from 'react';

const rowStyle = {
  display: 'flex',
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white',
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square(props) {
  return (
    <div
      onClick={props.onClick}
      className="square"
      style={squareStyle}> {props.children}
    </div>
  );
}

function Board() {
  const [winner, setWinner] = useState(false);
  const [whoWon, setWhoWon] = useState();
  const [player, setPlayer] = useState('X');
  const [game, setGame] = useState([['','',''],['','',''],['','','']]);

  function handleMove(line, column){
    const move = game[line][column];

    if(move === '' && !winner){
      let gameWithLastMove = [...game];
      gameWithLastMove[line][column] = player;

      if(player === 'X') setPlayer('O');
      else setPlayer('X')

      setGame(gameWithLastMove);
    }
  }

  function handleReset() {
    setGame([['','',''],['','',''],['','','']]);
    setPlayer('X');
    setWinner(false);
  }

  useEffect(() => {
    function checkWinner(move1, move2, move3){
      const empty = String(move1 + move2 + move3).trim();

      if(empty !== '' && move1 === move2  && move2 === move3){
        setWinner(true);
        setWhoWon(move1);
      }
    }

    // To win in horizontal
    checkWinner(game[0][0], game[0][1], game[0][2]);
    checkWinner(game[1][0], game[1][1], game[1][2]);
    checkWinner(game[2][0], game[2][1], game[2][2]);

    // To win in vertical
    checkWinner(game[0][0], game[1][0], game[2][0]);
    checkWinner(game[0][1], game[1][1], game[2][1]);
    checkWinner(game[0][2], game[1][2], game[2][2]);

    // To win in diagonal
    checkWinner(game[0][0], game[1][1], game[2][2]);
    checkWinner(game[0][2], game[1][1], game[2][0]);

  }, [game])

  return (
    <div style={containerStyle} className="gameBoard">
    {!winner && <div className="status" style={instructionsStyle}>Next player: {player}</div>}
    {winner && <div className="winner" style={instructionsStyle}>Winner: {whoWon}</div>}
    <button onClick={handleReset} style={buttonStyle}>Reset</button>
    <div style={boardStyle}>
      <div className="board-row" style={rowStyle}>
        <Square onClick={() => handleMove(0, 0)}> {game[0][0]} </Square>
        <Square onClick={() => handleMove(0, 1)}> {game[0][1]} </Square>
        <Square onClick={() => handleMove(0, 2)}> {game[0][2]} </Square>
      </div>
      <div className="board-row" style={rowStyle}>
        <Square onClick={() => handleMove(1, 0)}> {game[1][0]} </Square>
        <Square onClick={() => handleMove(1, 1)}> {game[1][1]} </Square>
        <Square onClick={() => handleMove(1, 2)}> {game[1][2]} </Square>
      </div>
      <div className="board-row" style={rowStyle}>
        <Square onClick={() => handleMove(2, 0)}> {game[2][0]} </Square>
        <Square onClick={() => handleMove(2, 1)}> {game[2][1]} </Square>
        <Square onClick={() => handleMove(2, 2)}> {game[2][2]} </Square>
      </div>
    </div>
  </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default Game;
