import { copyGrid } from '../utils'

function Cell({grid, node, toggleWall}) {
    let className = "inline-block h-6 w-6 border border-violet-600"
    if (node.isStart) {className += " bg-emerald-600"}
    else if (node.isFinish) {className += " bg-rose-700"}
    else if (node.isWall) {className += " bg-stone-200"}
    else (className += " bg-stone-800")
    
    return <div onMouseEnter={() => toggleWall(copyGrid(grid), node)} className={className} id={`${node.y}-${node.x}`}></div>
}

export default Cell