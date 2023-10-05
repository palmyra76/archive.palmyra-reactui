import validator from 'validator';

const validInput = (val) => {
    if (null == val || undefined == val) {
        return null;
    }
    return validator.isNumeric(val + '');
}

const rangeConverter = (value) => {
    if (validInput(value))
        return parseInt(value);

    return undefined;
}

const comparator = (x, y) => { return x <= y };


export { validInput, rangeConverter, rangeConverter as dataConverter, comparator };