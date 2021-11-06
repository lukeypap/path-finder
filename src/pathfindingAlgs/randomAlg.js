/*
from current node get all closeNodes 1 box away (left, right, up, down) 
choose a random one
change the node to visited (so it can't visit the same node twice)
push this into the visitedNodes array
pop this from the unvisitedNodes array

while the currentNode !== finishNode
*/

export function randomAlg(board, startNode, finishNode) {
    const visitedNodes = []
    let unvisitedNodes = getAllNodes(board)
    let currentNode = board[startNode.row][startNode.col]
    while (!!unvisitedNodes.length) {
        currentNode = chooseRandomNode(getAllCloseNodes(board, currentNode))
        while (board[currentNode.row][currentNode.col].hasBeenVisited) {
            currentNode = chooseRandomNode(getAllCloseNodes(board, currentNode))
        }
        currentNode = {...currentNode, hasBeenVisited: true}
        board[currentNode.row][currentNode.col] = currentNode
        visitedNodes.push(currentNode)
        unvisitedNodes = unvisitedNodes.filter(node => !node.hasBeenVisited)
        unvisitedNodes.shift(currentNode)
        if (currentNode.row === finishNode.row && currentNode.col === finishNode.col) {
            console.log(board)
            return visitedNodes
        }
    }
    return visitedNodes;  
}

function getAllCloseNodes(board, currentNode) {
    const closeNodes = []
    const {row, col} = currentNode
    if (row > 0) closeNodes.push(board[currentNode.row - 1][currentNode.col]) //row - 1
    if (col < board[row].length - 1) closeNodes.push(board[currentNode.row][currentNode.col + 1]) // col + 1
    if (row < board.length - 1) closeNodes.push(board[currentNode.row + 1][currentNode.col]) // row + 1
    if (col > 0) closeNodes.push(board[currentNode.row][currentNode.col - 1]) // col - 1
    return closeNodes;
}

function chooseRandomNode(closeNodes) {
    return closeNodes[Math.floor(Math.random() * closeNodes.length)]
}

function getAllNodes(board) {
    const unvisitedNodes = []
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            unvisitedNodes.push(board[i][j])
        }
    }
    return unvisitedNodes;
}