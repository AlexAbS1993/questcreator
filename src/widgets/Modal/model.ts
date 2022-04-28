import { doCloseModal } from './../../entities/Modal/model';
import { createEvent, sample, forward } from "effector"
import { $ActiveId, $IdList } from "../../entities/Id/model"
import { $changingId } from '../../features/variantActions/model';
import { $VariantList, setAlreadySelectedPath, setPath } from '../../entities/Variant/model';
import { createGate } from 'effector-react';
import { resetSelectedList, setSelectedList } from '../../entities/SelectedList/model';
import { $SelectedIdOnModalList, dropSelectedIdOnModalList } from '../../features/SelectIdAtList/model';
export const GmodalGate = createGate('modalGate')

// Очистка списка для выбора
forward({
    from: GmodalGate.close,
    to: resetSelectedList
})

// После открытия модального окна создается список ID-страниц 
sample({
    clock: GmodalGate.open,
    source: { idList: $IdList, activeId: $ActiveId },
    fn: (state) => {
        let selectedList = []
        for (let id in state.idList) {
            if (state.idList[id].id !== state.activeId) {
                selectedList.push({
                    name: state.idList[id].id,
                    key: state.idList[id].id
                })
            }
        }
        return selectedList
    },
    target: setSelectedList
})

// Тригер согласия на обработку решения в списке модального окна
export const setAcceptOfIDListSelect = createEvent()

// После согласия на применение в вариант прописывается путь
sample({
    clock: setAcceptOfIDListSelect,
    source: {
        activeVariant: $changingId,
        selectedId: $SelectedIdOnModalList
    },
    fn: (states) => {
        return {
            path: states.selectedId as string,
            id: states.activeVariant as string
        }
    },
    target: setPath
})

// После принятия согласия на применение модальное окно закрывается
forward({
    from: setAcceptOfIDListSelect,
    to: doCloseModal
})

// При закрытии модального окна сбрасывается выбранный ID списка узлов
forward({
    from: GmodalGate.close,
    to: dropSelectedIdOnModalList
})


sample({
    clock: GmodalGate.open,
    source: {
        variants: $VariantList,
        changingId: $changingId
    },
    fn: (states) => {
        let path = null
        states.variants.forEach(variant => {
            if (variant.id === states.changingId) {
                path = variant.path
            }
        })
        return path
    },
    target: setAlreadySelectedPath
})
