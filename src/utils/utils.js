export function getRandomNumber(min = -(10 ** 6), max = 10 ** 6) {
    return Math.random() * (max - min) + min;
}
