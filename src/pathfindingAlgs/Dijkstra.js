export function Dijkstra(board) {
    const unvisitedSet = getAllNodes(board)
    const visitedNodes = []
    while (unvisitedSet.length !== 0) {
        sortNodesByDistance(unvisitedSet)
        const currentNode = unvisitedSet.shift()
        currentNode.hasBeenVisited = true
        if (currentNode.wall) continue;
        if (currentNode.distance == Infinity) return visitedNodes;
        // board[currentNode.row][currentNode.col] = currentNode
        visitedNodes.push(currentNode)
        if (currentNode.finishNode === true) return visitedNodes;
        const closeNodes = getAllCloseNodes(board, currentNode);
        updateDistancesOfCloseNodes(closeNodes, currentNode)
    }
}

function updateDistancesOfCloseNodes(closeNodes, currentNode) {
    for(const node of closeNodes) {
        node.distance = currentNode.distance + 1;
        node.previousNode = currentNode;
    }
}

function sortNodesByDistance(unvisitedSet) {
    unvisitedSet.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }

function getAllCloseNodes(board, currentNode) {
    const closeNodes = []
    const {row, col} = currentNode
    if (row > 0) closeNodes.push(board[row - 1][col]) //row - 1
    if (col < board[0].length - 1) closeNodes.push(board[row][col + 1]) // col + 1
    if (row < board.length - 1) closeNodes.push(board[row + 1][col]) // row + 1
    if (col > 0) closeNodes.push(board[row][col - 1]) // col - 1
    return closeNodes.filter(node => !node.hasBeenVisited);
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

export function getShortestPath(endNode) {
    const shortestPath = [];
    let currentNode = endNode;
    while (currentNode !== null) {
        shortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return shortestPath;
}