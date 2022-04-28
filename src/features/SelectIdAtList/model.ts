import { createStore, createEvent } from "effector"

// Слежка за выбранным ID в SelectedList
export const $SelectedIdOnModalList = createStore<string | null>(null) // стор
export const setSelectedIdOnModalList = createEvent<string>()// сеттер
export const dropSelectedIdOnModalList = createEvent()// ресетер

$SelectedIdOnModalList.on(setSelectedIdOnModalList, (state, id) => {
    if (state === id) {
        return null
    }
    else {
        return id
    }
}) // слушатель сеттера
$SelectedIdOnModalList.reset(dropSelectedIdOnModalList) // слушатель ресетера