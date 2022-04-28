import { combine, createStore } from "effector";

export type IdListType = ({
    newID: boolean,
    id: string,
    selected: boolean
})[]

export const $IdList = createStore<IdListType>([{
    newID: false,
    id: "root",
    selected: true
}])
export const $ActiveId = $IdList.map((state) => {
    let filteredState = state.filter(idObj => idObj.selected === true)
    return filteredState[0]?.id
})
export const $TheLastCreated = combine($IdList, (stores) => {
    return stores.length === 1 ? 0 : stores.length - 1
})