export function createCardsArr(arr) {
    return arr.map((item) => ({ img: item, open: false }));
}
