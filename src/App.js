import { useState } from 'react'
import Button from './components/Button'
import Cell from './components/Cell'
import dijkstra from './dijkstra'
import { copyGrid } from './utils'


const GRID_HEIGHT = 30
const GRID_WIDTH = 60

const START_NODE_ROW = Math.floor(GRID_HEIGHT / 2)
const START_NODE_COLUMN = 5
const FINISH_NODE_ROW = Math.floor(GRID_HEIGHT / 2)
const FINISH_NODE_COLUMN = GRID_WIDTH - 5

function Node(y, x) {
  this.y = y
  this.x = x
  this.isStart = this.y === START_NODE_ROW && this.x === START_NODE_COLUMN
  this.isFinish = this.y === FINISH_NODE_ROW && this.x === FINISH_NODE_COLUMN
  this.isWall = false
  this.isVisited = false
  this.distance = this.isStart ? 0 : Infinity
  this.prevNode = null
}

function createGrid() {
  const grid = []
  for (let y = 0; y < GRID_HEIGHT; y++) {
    const row = []
    for (let x = 0; x < GRID_WIDTH; x++) {
      row.push(new Node(y, x))
    }
    grid.push(row)
  }
  return grid
}

function App() {
  const [grid, setGrid] = useState(createGrid)
  const [wallBuilding, setWallBuilding] = useState(false)
  const [algorithmRunnning, setAlgorithmRunnning] = useState(false)

  function clearPath(grid) {
    if (!algorithmRunnning) {
      grid = grid.map(row => row.map(node => {
        if (!node.isStart) {
          node.distance = Infinity
          node.isVisited = false
          node.prevNode = null
          if (!node.isWall && !node.isFinish) {
            document.getElementById(`${node.y}-${node.x}`).className = "inline-block h-6 w-6 border border-violet-600 bg-stone-800"
          }
        }
        return node
      }))
      setGrid(grid)
    }
  }

  function clearWalls(grid) {
    if (!algorithmRunnning) {
      grid = grid.map(row => row.map(node => {
        if (node.isWall) {
          node.isWall = false
        }
        return node
      }))
      setGrid(grid)
    }
  }

  function toggleWall(grid, node) {
    if (!algorithmRunnning && wallBuilding && !node.isStart && !node.isFinish) {
      grid[node.y][node.x].isWall = !node.isWall
      setGrid(grid)
    }
  }

  return (
    <>
    <div className="h-screen bg-stone-900 overflow-hidden">
      <div className="flex justify-center items-center">
        <Button onClick={async () => setGrid(await dijkstra(clearPath, copyGrid(grid), setAlgorithmRunnning))}>Run Djikstra</Button>
        <Button onClick={() => clearPath(copyGrid(grid))}>Clear Path</Button>
        <Button onClick={() => clearWalls(copyGrid(grid))}>Clear Walls</Button>
      </div>
      <div className="flex h-full justify-center items-center">
        <div onMouseDown={() => setWallBuilding(true)} onMouseUp={() => setWallBuilding(false)}>
          {grid.map(row => <div className="h-6">{row.map(node => <Cell grid={grid} setGrid={setGrid} node={node} toggleWall={toggleWall}/>)}</div>)}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
