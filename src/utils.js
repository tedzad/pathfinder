function copyGrid(grid) {
    return grid.map(row => row.map(node => {return {...node}}))
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export {copyGrid, sleep}