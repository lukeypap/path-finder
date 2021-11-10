export function RecursiveDivision(board, rows, cols) {
  console.log(board); //def working here
  let isHorizontal = true;
  let currentRows = rows / 2;
  let currentCols = cols / 2;
  let wallsInOrder = [];
  recurseBoard(board, currentRows, currentCols, isHorizontal, wallsInOrder);
  return wallsInOrder;
}

function recurseBoard(board, rows, cols, isHorizontal, wallsInOrder) {
  if (rows <= 1 && cols <= 1) {
    return wallsInOrder;
  }
  if (isHorizontal) {
    for (let i = 0; i < board.length; i++) {
      board[i][cols].wall = true;
      wallsInOrder.push(board[i][cols]);
    }
  } else {
    for (let i = 0; i < board[0].length; i++) {
      board[rows][i].wall = true;
      wallsInOrder.push(board[rows][i]);
    }
  }
  console.log(`ROWS: ${rows}, COLS: ${cols}`);
  recurseBoard(board, Math.floor(rows / 2), Math.floor(cols / 2), !isHorizontal, wallsInOrder);
}
