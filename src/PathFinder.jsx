import React from "react";
import Board from "./components/Board/Board";
import { CssBaseline } from "@mui/material";
import InfoPanel from "./components/InfoPanel";
import BoardLogic from "./components/Board/BoardLogic";

const PathFinder = () => {
  const {
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
  } = BoardLogic();
  return (
    <>
      <CssBaseline />
      <InfoPanel
        startAlgorithm={startAlgorithm}
        startDijkstra={startDijkstra}
        resetBoard={resetBoard}
        handleSliderChangeCol={handleSliderChangeCol}
        handleSliderChangeRow={handleSliderChangeRow}
        startRecurseWalls={startRecurseWalls}
      />
      <Board
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        board={board}
      />
    </>
  );
};

export default PathFinder;
