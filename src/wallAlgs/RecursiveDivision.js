export function RecursiveDivision(board, rows, cols) {
  let wallsInOrder = [];
  console.log(`ROWS: ${rows}, COLS: ${cols}`)
  recurseBoard(board, rows - 1, cols - 1, 0, 0, chooseDirection(rows, cols), wallsInOrder);
  return wallsInOrder;
}

function recurseBoard(board, maxRow, maxCol, minRow, minCol, direction, wallsInOrder) {
  console.log(`DIRECTION: ${direction}, MAXROW: ${maxRow}, MINROW: ${minRow}, MAXCOL: ${maxCol}, MINCOL: ${minCol}`)
  if (direction === 'horizontal') {
    if ((maxRow - minRow) < 1) {
      return wallsInOrder;
    }
    let y = Math.floor(randomNumber(minRow, maxRow) / 2) * 2;
    let hole = Math.floor(randomNumber(minCol, maxCol) / 2) * 2 + 1;
    for (let i = minCol; i <= maxCol; i++) {
      if (i !== hole && !board[y][i].startNode && !board[y][i].finishNode) {
        board[y][i].wall = true;
        console.log(`setting node ${y},${i} to wall`)
        wallsInOrder.push(board[y][i]);
      } else {
        wallsInOrder.filter((node) => node.col !== board[y][i].row && node.row !== board[y][i].col);
        board[y][i].wall = false;
      }
    }
    recurseBoard(board, maxRow, maxCol, y + 1, minCol, chooseDirection(maxRow - minRow, maxCol - minCol), wallsInOrder);
    recurseBoard(board, y - 1, maxCol, minRow, minCol, chooseDirection(maxRow - minRow, maxCol - minCol), wallsInOrder);
  } else if(direction === 'vertical') {
    if ((maxCol - minCol) < 1) {
      return wallsInOrder;
    }
    let x = Math.floor(randomNumber(minCol, maxCol) / 2) * 2;
    let hole = Math.floor(randomNumber(minRow, maxRow) / 2) * 2 + 1;
    for (let i = minRow; i <= maxRow; i++) {
      if (i !== hole && !board[i][x].startNode && !board[i][x].finishNode) {
        board[i][x].wall = true;
        console.log(`setting node ${i},${x} to wall`)
        wallsInOrder.push(board[i][x]);
      } else {
        
        wallsInOrder.filter((node) => node.col !== board[i][x].row && node.row !== board[i][x].col);
        board[i][x].wall = false;
      }
    }
    recurseBoard(board, maxRow, x - 1, minRow, minCol, chooseDirection(maxRow - minRow, maxCol - minCol), wallsInOrder);
    recurseBoard(board, maxRow, maxCol, minRow, x + 1, chooseDirection(maxRow - minRow, maxCol - minCol), wallsInOrder);
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

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
