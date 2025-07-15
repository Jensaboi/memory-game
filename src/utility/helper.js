export function createRandomCardsArr(arr) {
    let cardsArr = arr
        .map((item) => [
            { img: item, open: false },
            { img: item, open: false },
        ])
        .flat();

    return fisherYatesShuffle(cardsArr);
}
function fisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
