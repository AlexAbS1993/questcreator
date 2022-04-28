import { createEvent, createStore } from "effector";
import { VariantType } from "../Variant/model";

export type Dialogs = {
    [key: string]: {
        id: string,
        title: string,
        variants: VariantType[]
    }
}

export const $Dialogs = createStore<Dialogs>({
    'root': {
        id: 'root',
        title: 'root',
        variants: [{
            id: '0',
            nodeId: "root",
            discription: "Первая запись",
            path: null,
            isItFinal: false
        }]
    }
})

export const defineDialogs = createEvent<Dialogs>()
$Dialogs.on(defineDialogs, (_, payload) => {
    return payload
})

export const updateTitle = createEvent<{
    id: string,
    title: string
}>()

$Dialogs.on(updateTitle, (state, payload) => {
    state[payload.id].title = payload.title
    return state
})

export const updateVariants = createEvent<{
    nodeId: string,
    variants: VariantType[] | null
}>()

$Dialogs.on(updateVariants, (state, variantsData) => {
    if (variantsData.variants === null) {
        return state
    }
    state[variantsData.nodeId].variants = variantsData.variants
    return state
})

export const createNode = createEvent<{
    id: string,
    title: string,
    variants: VariantType[]
}>()

$Dialogs.on(createNode, (state, payload) => {
    return {
        ...state,
        [payload.id]: {
            ...payload
        }
    }
})

export const deleteNode = createEvent<string>()

$Dialogs.on(deleteNode, (state, id) => {
    delete state[id]
    return state
})