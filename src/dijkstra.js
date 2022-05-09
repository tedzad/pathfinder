import { sleep } from './utils'

function updateNeighbours(grid, node) {
    const topNeighbour = node.y > 0 ? grid[node.y - 1][node.x] : undefined
    const rightNeighbour = node.x < grid[0].length - 1 ? grid[node.y][node.x + 1] : undefined
    const bottomNeighbour = node.y < grid.length - 1 ? grid[node.y + 1][node.x] : undefined
    const leftNeighbour = node.x > 0 ? grid[node.y][node.x - 1] : undefined

    let neighbours = [topNeighbour, bottomNeighbour, rightNeighbour, leftNeighbour]
    neighbours = neighbours.filter(neighbour => neighbour !== undefined)

    for (const neighbour of neighbours) {
        if (neighbour.distance === Infinity && !neighbour.isWall) {
            neighbour.distance = node.distance + 1
            neighbour.prevNode = node
        }
    }
}

const getUnivisitedNodeWithSmallestDistance = grid => {
    let flatGrid = grid.flat()
    flatGrid = flatGrid.filter(node => !node.isStart && !node.isVisited && !node.isWall && node.distance !== Infinity)
    flatGrid.sort((a,b) => a.distance - b.distance)
    return flatGrid.length > 0 ? flatGrid[0] : null
}

const getPathToStartNode = node => {
    const shortestPath = []
    if (node) {
        while (!node.prevNode.isStart) {
            node = node.prevNode
            shortestPath.push(node)
        }
    }
    return shortestPath
}

function dijkstraAlgorithm(grid) {
    const visitedNodes = []
    let currentNode = grid[15][5]
    updateNeighbours(grid, grid[15][5])
    while (true) {
        currentNode = getUnivisitedNodeWithSmallestDistance(grid)
        if (currentNode === null || currentNode.isFinish) {break}
        currentNode.isVisited = true
        visitedNodes.push(currentNode)
        updateNeighbours(grid, currentNode)
    }
    const shortestPath = getPathToStartNode(currentNode)
    return [grid, visitedNodes, shortestPath]
}

async function dijkstra(clearPath, grid, setAlgorithmRunnning) {
    clearPath(grid)
    setAlgorithmRunnning(true)
    let visitedNodes, shortestPath
    [grid, visitedNodes, shortestPath] = dijkstraAlgorithm(grid)
    for (const node of visitedNodes) {
        await sleep(1)
        document.getElementById(`${node.y}-${node.x}`).className += " bg-blue-500"
    }
    for (const node of shortestPath) {
        await sleep(10)
        document.getElementById(`${node.y}-${node.x}`).className += " bg-yellow-500"
    }
    setAlgorithmRunnning(false)
    return grid
}

export default dijkstra