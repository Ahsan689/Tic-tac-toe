import React, { useState } from "react";
import { motion } from "framer-motion";
import "./styles.css";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 0.2 + i * 0.1;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 0.8, bounce: 0 },
        opacity: { delay, duration: 0.01 }
      }
    };
  }
};

export default function TicTacToe() {
  const [gameBoard, setGameBoard] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameWon, setGameWon] = useState(false);
  const [gameTie, setGameTie] = useState(false);

  const handleClick = (index) => {
    if (gameBoard[index] !== "" || gameWon) {
      return;
    }
    let newBoard = [...gameBoard];
    let cross_Sign;
    let circle_Sign;
    if (currentPlayer === "X") {
      cross_Sign = (
        <>
          <motion.line
          className="cross"
            x1="80"
            y1="80"
            x2="220"
            y2="230"
            stroke="#00cc88"
            variants={draw}
            custom={2}
          />
          <motion.line
            className="cross"
            x1="80"
            y1="230"
            x2="220"
            y2="80"
            stroke="#00cc88"
            variants={draw}
            custom={2.5}
          />
        </>
      );
      newBoard[index] = cross_Sign;
      console.log(newBoard);
      setGameBoard(newBoard);
    } else {
      circle_Sign = (
        <>
          <motion.circle
            className="circle"
            cx="150"
            cy="150"
            r="80"
            stroke="#ff0055"
            variants={draw}
            custom={3}
          />
        </>
      );
      newBoard[index] = circle_Sign;
      setGameBoard(newBoard);
    }
    // newBoard[index] = currentPlayer;

    // Check for a winner
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let counter=0
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (
        // newBoard[a] === currentPlayer &&
        // newBoard[b] === currentPlayer &&
        // newBoard[c] === currentPlayer
        newBoard[a]?.props?.children[0]?.props?.className === 'cross' &&
        newBoard[b]?.props?.children[0]?.props?.className === 'cross' &&
        newBoard[c]?.props?.children[0]?.props?.className === 'cross' 
        ||
        newBoard[a]?.props?.children?.props?.className === 'circle' &&
        newBoard[b]?.props?.children?.props?.className === 'circle' &&
        newBoard[c]?.props?.children?.props?.className === 'circle' 

      ) {
        console.log("game won");
        setGameWon(true);
        // return;
      }
      else if(newBoard[i] !=="" ){
        counter++
        if(counter === 8){
          setGameTie(true);
          
        }
      }
    }
    // Change the current player
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

  };

  const renderSquares = () => {
    return gameBoard.map((square, index) => {
      return (
        // <motion.div
        //   key={index}
        //   className="square"
        //   // whileHover={{ scale: 1.1 }}
        //   whileTap={{ scale: 0.9 }}
        //   onClick={() => handleClick(index)}
        // >
        //   {square}
        // </motion.div>
        <motion.svg
          className="square"
          key={index}
          width="150"
          height="150"
          viewBox="0 0 300 300"
          initial="hidden"
          animate="visible"
          onClick={() =>{ handleClick(index)}}
        >
          {square?.props?.children}
        </motion.svg>
      );
    });
  };
  console.log(currentPlayer,"currentPlayer");

  const handleReset =() => {
    setGameBoard(["","","","","","","","",""])
    setCurrentPlayer('X')
    setGameWon(false)
    setGameTie(false)
  }

  return (
    <>
    <span style={{color:'white',cursor:'pointer'}} onClick={handleReset}>Reset Game</span>
  <div className="tic-tac-toe">{renderSquares()}</div>
   {gameTie === true ? <span style={{color:'white'}}>Game Tie</span>:null}
   {gameWon === true ? <span style={{color:'white'}}>Game Won</span>:null}
    </>
  );
}
