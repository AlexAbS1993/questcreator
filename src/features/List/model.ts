import { createEvent, sample } from "effector"
import { $IdList } from "../../entities/Id/model"



export const addToIdList = createEvent<string>()

$IdList.on(addToIdList, (state, id) => {
    if (!state.some(idObj => {
        return idObj.id === id
    })) {
        let newIdObj = {
            newID: true,
            id: id,
            selected: true
        }
        return [
            ...state.map(idObj => {
                return {
                    ...idObj,
                    selected: false
                }
            }),
            newIdObj
        ]
    }
})

export const saveToList = createEvent<string>()

$IdList.on(saveToList, (state, id) => {
    return state.map((idObj) => {
        if (id === idObj.id) {
            return {
                ...idObj,
                newID: false
            }
        }
        else {
            return idObj
        }
    })
})

export const clearAllUnsaved = createEvent()
$IdList.on(clearAllUnsaved, (state) => {
    return state.filter(idObj => !idObj.newID)
})

export const defineActiveId = createEvent<string>()
$IdList.on(defineActiveId, (state, id) => {
    return state.map(idObj => {
        if (idObj.id === id) {
            return {
                ...idObj,
                selected: true
            }
        }
        else {
            return {
                ...idObj,
                selected: false
            }
        }
    })
})


export const deleteFromList = createEvent<string>()

sample({
    clock: deleteFromList,
    source: $IdList,
    fn: (source, clock) => {
        let activeId: string | null = null
        source.forEach((idObj) => {
            if (idObj.selected === true) {
                activeId = idObj.id
            }
        })
        if (activeId == null) {
            activeId = source[source.length - 1].id
        }
        return activeId
    },
    target: defineActiveId
})
$IdList.on(deleteFromList, (state, id) => {
    if (id === 'root') {
        return state
    }
    else {
        return state.filter(idObj => {
            if (id !== idObj.id || idObj.id === "root") {
                return true
            }
            return false
        })
    }
})

export const renameId = createEvent<{
    past: string,
    new: string
}>()
$IdList.on(renameId, (state, payload) => {
    if (state.some(idObj => idObj.id === payload.new)) {
        return state
    }
    else {
        return state.map(idObj => {
            if (idObj.id === payload.past) {
                return {
                    ...idObj,
                    id: payload.new
                }
            }
            else {
                return {
                    ...idObj
                }
            }
        })
    }
})