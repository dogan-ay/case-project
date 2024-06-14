const floatParser = num => {
    let integerPart = Math.floor(num);
    let decimalPart = parseFloat((num - integerPart).toFixed(2)) * 100;

    return [integerPart, decimalPart];
}

export {floatParser};