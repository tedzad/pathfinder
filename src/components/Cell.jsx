import { copyGrid } from '../utils'

function Cell({grid, node, toggleWall}) {
    let className = "inline-block h-6 w-6 border border-indigo-600"
    if (node.isStart) {className += " bg-green-500"}
    else if (node.isFinish) {className += " bg-red-500"}
    else if (node.isWall) {className += " bg-black"}
    
    return <div onMouseEnter={() => toggleWall(copyGrid(grid), node)} className={className} id={`${node.y}-${node.x}`}></div>
}

export default Cell