import validator from 'validator';

const validInput = (value, format) => {
    if (null == value || undefined == value) {
        return null;
    }
    var displayPattern = format.format?.displayPattern || 'dd-MM-yyyy';
    return validator.isDate(value + '', {format:displayPattern});
}

const rangeConverter = (value, format) => {
    var displayPattern = format.format?.displayPattern || 'dd-MM-yyyy';
    if (validInput(value, format))
        return validator.toDate(value + '', {format:displayPattern});
    console.log("returning undefined for the value " + value);
    return undefined;
}

const dataConverter = (value, format) => {
    var displayPattern = format.format?.displayPattern || 'dd-MM-yyyy';
    if (validInput(value, format))
        return validator.toDate(value + '', {format:displayPattern});
    
        console.log("returning undefined for the value " + value);
    return undefined;
}

const comparator = (x, y) => { 
    console.log(x);
    console.log(y);
    return x <= y };


export { validInput, rangeConverter, dataConverter, comparator };