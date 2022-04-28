export function defineIdOfTheLastNode(nodeState: ({
    newID: boolean,
    id: string,
    selected: boolean
})[]) {
    return nodeState[nodeState.length - 1].id
}