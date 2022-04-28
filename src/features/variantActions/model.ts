import { $Modal, doCloseModal } from './../../entities/Modal/model';
import { createStore, guard, sample } from 'effector';
import { createEvent } from 'effector';
import { $Dialogs } from '../../entities/EditorDialog';
import { updateVariants } from '../../entities/EditorDialog/model';
import { $ActiveId } from '../../entities/Id/model';
import { $VariantList } from '../../entities/Variant';
import { $lastIdOfVariants, addToVariantList, defineVariants, VariantType } from '../../entities/Variant/model';

export const endTypingUpdate = createEvent<'save' | 'reset'>()


sample({
    clock: endTypingUpdate,
    source: {
        variants: $VariantList,
        activeId: $ActiveId,
        dialogs: $Dialogs
    },
    filter: (state, trigger) => {
        if (trigger === 'save') {
            return true
        }
        else {
            return false
        }
    },
    fn: (state) => {
        return {
            nodeId: state.activeId,
            variants: state.variants
        }
    },
    target: updateVariants
})
sample({
    clock: endTypingUpdate,
    source: {
        variants: $VariantList,
        activeId: $ActiveId,
        dialogs: $Dialogs
    },
    filter: (state, trigger) => {
        if (trigger === 'reset') {
            return true
        }
        else {
            return false
        }
    },
    fn: (state) => {
        return state.dialogs[state.activeId].variants
    },
    target: defineVariants
})
// Добавляем в список

export const addToList = createEvent()
sample({
    clock: addToList,
    source: {
        activeId: $ActiveId,
        lastId: $lastIdOfVariants
    },
    fn: (states) => {
        let dataObject: VariantType = {
            path: null,
            id: String(states.lastId + 1),
            discription: 'Новая запись',
            nodeId: states.activeId,
            isItFinal: false
        }
        return dataObject
    },
    target: addToVariantList
})

// Какое айди варианта сейчас меняется в данный момент
export const $changingId = createStore<string | null>(null)
export const setChangingId = createEvent<string>()
export const dropChangingId = createEvent()
$changingId.on(setChangingId, (_, id) => id)
$changingId.reset(dropChangingId)
guard({
    clock: doCloseModal,
    source: {
        modal: $Modal
    },
    filter: (state) => {
        if (state.modal.type === 'selectId') {
            return true
        }
        else {
            return false
        }
    },
    target: dropChangingId
})

// Показать путь при наведении
export const $isUpPathButton = createStore<{ status: boolean, id: string }>({ status: false, id: '' })
export const setOnPathButton = createEvent<{ status: boolean, id: string }>()
$isUpPathButton.on(setOnPathButton, (_, payload) => payload)

// Показать только один путь одного варианта при наведении
export const $isOneVariantPath = createStore<boolean>(true)
export const setOneVariant = createEvent()
export const setManyVariants = createEvent()
$isOneVariantPath
    .on(setOneVariant, () => true)
    .on(setManyVariants, () => false)