function Cell({node, toggleWall}) {
    let className = "inline-block h-6 w-6 border border-indigo-600"
    if (node.isStart) {className += " bg-green-500"}
    else if (node.isWall) {className += " bg-black"}
    else if (node.isFinish) {className += " bg-red-500"}
    
    return <div className={className} id={`${node.y}-${node.x}`}></div>
    //return <div className={className} id={node.id} onMouseEnter={() => toggleWall(node)}></div>
}

export default Cell