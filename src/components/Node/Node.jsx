import React from "react";
import styled, { keyframes } from "styled-components/macro";
import "./Node.css";

const grow = keyframes`
  0% {
    transform: scale(0.4)
  }

  50% {
    transform: scale(0.8)
  }

  90% {
    transform: scale(1.2)
  }

  100% {
    transform: scale(1)
  }
`;

const Box = styled.span`
  width: 20px;
  height: 20px;
  border: 0.5px solid #cacaca;
`;

const Wall = styled.span`
  width: 20px;
  height: 20px;
  background-color: #646464;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.8);
  animation: ${grow} 0.1s linear;
`;

const StartNode = styled.span`
  width: 20px;
  height: 20px;
  background-color: #58b358;
  box-shadow: 0px 0px 7px 0px #58b358;
`;

const FinishNode = styled.span`
  width: 20px;
  height: 20px;
  background-color: #d17070;
  box-shadow: 0px 0px 7px 0px #d17070;
`;

const Node = ({ startNode, finishNode, row, col, hasBeenVisited, wall, onMouseDown, onMouseEnter, onMouseUp, onMouseLeave }) => {
  const chooseNode = () => {
    if (startNode) {
      return (
        <StartNode
          id={`node-${row}-${col}`}
          className="STARTNODE"
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp(row, col)}
          onMouseLeave={() => onMouseLeave(row, col)}
        />
      );
    } else if (finishNode) {
      return (
        <FinishNode
          id={`node-${row}-${col}`}
          className="FINISHNODE"
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}
          onMouseLeave={() => onMouseLeave(row, col)}
        />
      );
    } else if (wall) {
      return (
        <Wall
          id={`node-${row}-${col}`}
          className="WALLNODE"
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}
        />
      );
    } else {
      return (
        <Box
          id={`node-${row}-${col}`}
          className="EMPTYNODE"
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}
        />
      );
    }
  };

  return <>{chooseNode()}</>;
};

export default Node;
