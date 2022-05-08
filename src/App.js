import { useState } from 'react'
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

  function clearPath(grid) {
    grid = grid.map(row => row.map(node => {
      if (!node.isStart) {
        node.distance = Infinity
        node.isVisited = false
        node.prevNode = null
        if (!node.isWall && !node.isFinish) {
          document.getElementById(`${node.y}-${node.x}`).className = "inline-block h-6 w-6 border border-indigo-600"
        }
      }
      return node
    }))
    return grid
  }

  return (
    <>
    <button onClick={async () => setGrid(await dijkstra(copyGrid(grid)))}>Run Djikstra</button>
    <button onClick={() => setGrid(clearPath(copyGrid(grid)))}>
      Clear Path
    </button>
    <div>
      {grid.map(row => <div className="h-6">{row.map(node => <Cell node={node}/>)}</div>)}
    </div>
    </>
  );
}

export default App;
