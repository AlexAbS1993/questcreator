import { createEvent } from 'effector';
import { createStore } from 'effector';
type typingStoreType = string | null

export const $TypingVariantField = createStore<typingStoreType>(null)

export const setTyping = createEvent<string>()
export const resetTyping = createEvent()

$TypingVariantField.on(setTyping, (_, id) => id)
$TypingVariantField.reset(resetTyping)