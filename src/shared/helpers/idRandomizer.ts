const settings = {
    length: 8,
    minKey: 48,
    maxKey: 122
}


export function randomId() {
    let str = ``
    for (let i = 0; i < settings.length; i++) {
        let rn = randomNumber()
        if (rn === 63) {
            rn = 65
        }
        if (rn >= 58 && rn <= 66) {
            rn = Math.floor((Math.random() * (122 - 97 + 1)) + 97)
        }
        if (rn >= 91 && rn <= 96) {
            rn = Math.floor((Math.random() * (122 - 97 + 1)) + 97)
        }
        str += String.fromCharCode(rn)
    }
    return str

    function randomNumber() {
        return Math.floor((Math.random() * (settings.maxKey - settings.minKey + 1)) + settings.minKey)
    }
}