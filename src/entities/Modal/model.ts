import { combine } from 'effector';
import { createEvent } from 'effector';
import { createStore } from 'effector';
export const $isModalOpen = createStore<boolean>(false)

export const doOpenModal = createEvent<string>()
export const doCloseModal = createEvent()
export const $ModalType = createStore<string | null>(null)

$isModalOpen.on(doCloseModal, (_, __) => false)
$isModalOpen.on(doOpenModal, (_, __) => true)
$ModalType.on(doOpenModal, (state, type) => type)
$ModalType.on(doCloseModal, (state, type) => null)

export const $Modal = combine({
    isOpen: $isModalOpen,
    type: $ModalType
})