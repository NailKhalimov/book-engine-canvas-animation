function intersection(AX1, AY1, AX2, AY2, BX1, BY1, BX2, BY2) {
    AX1 = ((AX1 * AY2 - AX2 * AY1) * (BX2 - BX1) - (BX1 * BY2 - BX2 * BY1) * (AX2 - AX1)) / ((AY1 - AY2) * (BX2 - BX1) - (BY1  - BY2) * (AX2 - AX1))
    AY1 = ((BY1 - BY2) * AX1 - (BX1 * BY2 - BX2 * BY1)) / (BX2 - BX1)
    AX1 *= -1

    return {
        x: AX1,
        y: AY1
    }
}

console.log({x: 1, y: 2}, intersection(-3, 0, 5, 4, 0, 5, 2, -1))
console.log({x: -3, y: 3}, intersection(0, 5, -3, 3, -3, 3, 3, 2))
console.log({x: 3, y: 2}, intersection(0, 4, 6, 0, 3, 2, 5, 4))
