export function RecursiveDivision(board, rows, cols) {
  console.log(board); //def working here
  let isHorizontal = true;
  console.log(rows, cols);
  let wallsInOrder = [];
  recurseBoard(board, rows, cols, isHorizontal, wallsInOrder);
  return wallsInOrder;
}

function recurseBoard(board, rows, cols, isHorizontal, wallsInOrder) {
  if (rows <= 1 && cols <= 1) {
    return wallsInOrder;
  }
  if (isHorizontal) {
    for (let i = 0; i < rows - 1; i++) {
      board[i][cols].wall = true;
      wallsInOrder.push(board[i][cols]);
    }
  } else {
    for (let i = 0; i < cols - 1; i++) {
      board[rows][i].wall = true;
      wallsInOrder.push(board[rows][i]);
    }
  }
  console.log(`ROWS: ${rows}, COLS: ${cols}`);
  recurseBoard(board, Math.floor(rows / 2), Math.floor(cols / 2), !isHorizontal, wallsInOrder);
}

function divide(board, row, col, direction) {
  if (row < 2 || col < 2) {
    return;
  }
}

function chooseDirection(rows, cols) {
  if (cols < rows) {
    return "horizontal";
  } else if (rows < cols) {
    return "vertical";
  } else {
    return Math.floor(Math.random() * 2) === 0 ? "horizontal" : "vertical";
  }
}
