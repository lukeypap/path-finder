import { useState, useRef } from "react";
import { Dijkstra, getShortestPath } from "../../pathfindingAlgs/Dijkstra";
import { randomAlg } from "../../pathfindingAlgs/randomAlg";
import { RecursiveDivision } from "../../wallAlgs/RecursiveDivision";

const STARTNODECLASS = "startNode";
const ENDNODECLASS = "finishNode";
const WALLCLASS = "wallNode";
const EMPTYNODECLASS = "emptyNode";

const BoardLogic = () => {
  const STARTNODE = {
    row: 9,
    col: 5,
  };
  const FINISHNODE = {
    row: 9,
    col: 40,
  };

  const createBoard = (ROWS, COLS) => {
    const nodes = [];
    for (let row = 0; row < ROWS; row++) {
      const currRow = [];
      for (let col = 0; col < COLS; col++) {
        currRow.push(createNode(row, col));
      }
      nodes.push(currRow);
    }
    return nodes;
  };

  const createNode = (row, col) => {
    return {
      row: row,
      col: col,
      wall: false,
      startNode: STARTNODE.row === row && STARTNODE.col === col,
      finishNode: FINISHNODE.row === row && FINISHNODE.col === col,
      hasBeenVisited: false,
      distance: STARTNODE.row === row && STARTNODE.col === col ? 0 : Infinity,
      previousNode: null,
    };
  };

  const [row, setRow] = useState(20);
  const [col, setCol] = useState(46);
  const [board, setBoard] = useState(createBoard(row, col));
  const [mousePressed, setMousePressed] = useState(false);
  const previousStartNode = useRef(STARTNODE);
  const previousEndNode = useRef(FINISHNODE);
  const [clickedOnTerminalNode, setClickedOnTerminalNode] = useState(false);
  const [startOrEnd, setStartOrEnd] = useState();

  const getNewBoardWithWall = (board, row, col) => {
    const newBoard = board.slice();
    let node = newBoard[row][col];
    if (node.startNode || node.finishNode) return newBoard;
    node = {
      ...node,
      wall: true,
    };
    newBoard[row][col] = node;
    document.getElementById(`node-${node.row}-${node.col}`).className = WALLCLASS;
    return newBoard;
  };

  const updateTerminalNodes = (board, row, col) => {
    const newBoard = board.slice();
    let node = newBoard[row][col];
    if (node.wall) return newBoard;
    if (startOrEnd === "start") {
      node.startNode = true;
      node.distance = 0;
      newBoard[previousStartNode.current.row][previousStartNode.current.col].startNode = false;
      newBoard[previousStartNode.current.row][previousStartNode.current.col].distance = Infinity;
      document.getElementById(`node-${node.row}-${node.col}`).className = STARTNODECLASS;
      document.getElementById(
        `node-${previousStartNode.current.row}-${previousStartNode.current.col}`
      ).className = EMPTYNODECLASS;
      previousStartNode.current = { row: row, col: col };
    } else if (startOrEnd === "end") {
      node.finishNode = true;
      newBoard[previousEndNode.current.row][previousEndNode.current.col].finishNode = false;
      document.getElementById(
        `node-${previousEndNode.current.row}-${previousEndNode.current.col}`
      ).className = EMPTYNODECLASS;
      document.getElementById(`node-${node.row}-${node.col}`).className = ENDNODECLASS;
      previousEndNode.current = { row: row, col: col };
    }

    return newBoard;
  };

  const handleMouseLeave = (row, col) => {
    if (clickedOnTerminalNode) {
    }
  };

  const handleMouseDown = (row, col) => {
    setMousePressed(true);
    let node = board[row][col];
    if (node.startNode || node.finishNode) {
      setClickedOnTerminalNode(true);
      if (node.startNode) setStartOrEnd("start");
      else setStartOrEnd("end");
    } else {
      getNewBoardWithWall(board, row, col);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!mousePressed) return;
    if (clickedOnTerminalNode) {
      updateTerminalNodes(board, row, col);
    } else {
      getNewBoardWithWall(board, row, col);
    }
  };

  const handleMouseUp = () => {
    setMousePressed(false);
    setClickedOnTerminalNode(false);
    setStartOrEnd(null);
  };

  const startAlgorithm = () => {
    resetBoard(board);
    const visitedNodes = randomAlg(board, STARTNODE, FINISHNODE);
    animateAlgorithm(visitedNodes);
  };

  const startDijkstra = () => {
    clearBoard();
    const visitedNodes = Dijkstra(board);
    const shortestPath = getShortestPath(
      board[previousEndNode.current.row][previousEndNode.current.col]
    );
    animateAlgorithm(visitedNodes, shortestPath);
  };

  const startRecurseWalls = () => {
    const wallsInOrder = RecursiveDivision(board, row, col);
    console.log(wallsInOrder);
    animateWallsInOrder(wallsInOrder);
  };

  const animateWallsInOrder = (wallsInOrder) => {
    for (let i = 0; i < wallsInOrder.length; i++) {
      setTimeout(() => {
        const node = wallsInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = WALLCLASS;
      }, 10 * i);
    }
  };

  const animateAlgorithm = (visitedNodes, shortestPath) => {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        const node = visitedNodes[i];
        document.getElementById(
          `node-${node.row}-${node.col}`
        ).className = `${EMPTYNODECLASS} node-visited`;
        if (i === visitedNodes.length - 1) {
          animateShortestPath(shortestPath);
        }
      }, 10 * i);
    }
  };

  const animateShortestPath = (shortestPath) => {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        document.getElementById(
          `node-${node.row}-${node.col}`
        ).className = `${EMPTYNODECLASS} node-shortestPath`;
      }, 100 * i);
    }
  };

  const clearBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const node = board[i][j];
        if (node.startNode) {
          document.getElementById(`node-${node.row}-${node.col}`).className = STARTNODECLASS;
        } else if (node.finishNode) {
          document.getElementById(`node-${node.row}-${node.col}`).className = ENDNODECLASS;
        } else if (node.wall) {
          document.getElementById(`node-${node.row}-${node.col}`).className = WALLCLASS;
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className = EMPTYNODECLASS;
        }
      }
    }
  };

  // find better way
  const resetBoard = () => {
    const newBoard = createBoard(row, col);
    setBoard(newBoard);
    previousStartNode.current = STARTNODE;
    previousEndNode.current = FINISHNODE;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const node = board[i][j];
        if (node.startNode) {
          document.getElementById(`node-${node.row}-${node.col}`).className = STARTNODECLASS;
        } else if (node.finishNode) {
          document.getElementById(`node-${node.row}-${node.col}`).className = ENDNODECLASS;
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className = EMPTYNODECLASS;
        }
      }
    }
  };

  const handleSliderChangeCol = (e) => {
    setCol(e.target.value);
    setBoard(createBoard(row, col));
  };

  const handleSliderChangeRow = (e) => {
    setRow(e.target.value);
    setBoard(createBoard(row, col));
  };

  return {
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave,
    startAlgorithm,
    startDijkstra,
    startRecurseWalls,
    resetBoard,
    handleSliderChangeCol,
    handleSliderChangeRow,
    board,
  };
};

export default BoardLogic;
