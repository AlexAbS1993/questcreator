import { createStore, createEvent } from "effector"

// Список ID страниц
export const $SelectedList = createStore<({ name: string, key: string })[]>([]) // стор
export const setSelectedList = createEvent<({ name: string, key: string })[]>() // сеттер
export const resetSelectedList = createEvent()// ресетер

$SelectedList.on(setSelectedList, (_, list) => list) // слушатель сеттера
$SelectedList.reset(resetSelectedList) // слушатель ресетера
