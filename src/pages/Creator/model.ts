import { Dialogs } from './../../entities/EditorDialog/model';
import { clearAllUnsaved, defineActiveId } from './../../features/List/model';
import { createEvent, sample } from "effector";
import { $Dialogs, createNode, defineDialogs, deleteNode, updateTitle, updateVariants } from "../../entities/EditorDialog/model";
import { $TextAreaStore } from "../../entities/Field/model";
import { $ActiveId, $IdList } from "../../entities/Id/model";
import { $VariantList, addToVariantList, deleteFromVariantList } from "../../entities/Variant/model";
import { addToIdList } from "../../features/List";
import { deleteFromList } from "../../features/List/model";

export const saveTriggerEvent = createEvent()

// Обновление описания после срабатывания триггера сохранения
sample({
    clock: saveTriggerEvent,
    source: [$ActiveId, $TextAreaStore],
    fn: (states) => {
        let activeId = states[0]
        let text = states[1]
        return {
            id: activeId,
            title: text
        }
    },
    target: updateTitle
})

sample({
    clock: addToIdList,
    fn: (trigger) => {
        return {
            id: trigger,
            title: trigger,
            variants: [{
                path: null,
                discription: "Первая запись",
                id: '0',
                nodeId: trigger,
                isItFinal: false,
            }]
        }
    },
    target: createNode
})

sample({
    clock: deleteFromList,
    target: deleteNode
})

sample({
    clock: deleteFromVariantList,
    source: { variants: $VariantList, activeid: $ActiveId },
    fn: (state, clock) => {
        return {
            nodeId: state.activeid,
            variants: state.variants.filter(variant => variant.id !== clock)
        }
    },
    target: updateVariants
})

// Здесь в сущность Dialogs передаётся ссылка на Variants. 
// Именно поэтому изменения Variants тут же сказываются на сущности Dialogs. 
// Отдельная синхронизация не требуется
sample({
    clock: addToVariantList,
    source: { variants: $VariantList, activeid: $ActiveId },
    fn: (state, clock) => {
        return {
            nodeId: state.activeid,
            variants: state.variants
        }
    },
    target: updateVariants
})

// Когда удаляются несохраненные сущности, то обновляются поля в Dialogs - тоже убираются несохранённые

sample({
    clock: clearAllUnsaved,
    source: { list: $IdList, dialogs: $Dialogs },
    fn: (states) => {
        let newDialogs: Dialogs = {}
        states.list.forEach((idObj) => {
            newDialogs[idObj.id] = states.dialogs[idObj.id]
        })
        return newDialogs
    },
    target: defineDialogs
})

sample({
    clock: clearAllUnsaved,
    source: { list: $IdList, activeId: $ActiveId },
    fn: (state) => {
        if (state.list.some(idObj => idObj.id === state.activeId)) {
            return state.activeId
        }
        else {
            return state.list[state.list.length - 1].id
        }
    },
    target: defineActiveId
})