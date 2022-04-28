let timeout: any | null = null

export function debounce(fn: any, delay: number) {
    if (!timeout) {
        timeout = setTimeout(() => {
            fn()
        }, delay)
    }
    else {
        clearTimeout(timeout)
        timeout = null
        debounce(fn, delay)
    }
}