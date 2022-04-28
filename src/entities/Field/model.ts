import { createEvent } from 'effector';
import { createStore } from 'effector';
import { createGate } from 'effector-react';
export const $TextAreaStore = createStore<string>('')

export const setTextArea = createEvent<string>()

$TextAreaStore.on(setTextArea, (_, payload) => {
    return payload
})

export const Gfield = createGate('fieldGate')