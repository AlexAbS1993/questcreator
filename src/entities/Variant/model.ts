import { combine, createEvent, createStore } from "effector"

export type VariantType = {
    path: string | null,
    id: string,
    discription: string,
    nodeId: string,
    isItFinal: boolean
}

// Создание стора вариантов
export const $VariantList = createStore<VariantType[]>([])

// Определение последнего ID варианта для создания в будущем нового с id+1
export const $lastIdOfVariants = combine($VariantList, (state) => {
    return Number(state[state.length - 1]?.id) || 0
})


// Измнение описания варианта
export const changeVariant = createEvent<{
    value: string,
    id: string
}>()  // эвент для измнения описания варианта
$VariantList.on(changeVariant, (state, payload) => {
    return state.map(variant => {
        if (variant.id === payload.id) {
            return {
                ...variant,
                discription: payload.value
            }
        }
        else {
            return variant
        }
    })
})

// Инициализация вариантов
export const defineVariants = createEvent<VariantType[]>()
$VariantList.on(defineVariants, (_, payload) => payload)

// Добавление в список нового варианта
export const addToVariantList = createEvent<VariantType>()
$VariantList.on(addToVariantList, (state, payload) => {
    return [
        ...state,
        payload
    ]
})

export const deleteFromVariantList = createEvent<string>()
$VariantList.on(deleteFromVariantList, (state, id) => {
    if (state.length === 1) {
        return state
    }
    return state.filter(variant => {
        return variant.id !== id
    })
})


// Установка пути для варианта
export const setPath = createEvent<{
    id: string,
    path: string
}>()

$VariantList.on(setPath, (state, payload) => {
    return state.map(variant => {
        if (variant.id === payload.id) {
            variant.path = payload.path
            return variant
        }
        else {
            return variant
        }
    })
})

// Уже выбранный путь
export const $AlreadySelectedPath = createStore<string | null>(null)
export const setAlreadySelectedPath = createEvent<string | null>()

$AlreadySelectedPath.on(setAlreadySelectedPath, (_, path) => path)
