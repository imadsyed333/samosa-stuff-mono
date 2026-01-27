export const formatOrderId = (id: number): string => {
    let numString = String(id)

    while (numString.length < 4) {
        numString = "0" + numString
    }
    return numString
}

export const formatPrice = (price: number): string => {
    const priceToDollars = price / 100
    return `${priceToDollars.toFixed(2)}`
}