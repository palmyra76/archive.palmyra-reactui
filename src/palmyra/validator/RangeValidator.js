import validator from 'validator';

import {
    validInput as isNumber, rangeConverter as toNumber,
    comparator as numericCmp
} from './NumericRangeValidator';

import {
    validInput as isDate, rangeConverter as rangeToDate,
    dataConverter as valueToDate, comparator as dateCmp
} from './DateRangeConverter';

const RangeValidator = (format) => {
    const type = format.type;

    switch (format.type) {
        case 'date':
            return dateRangeValidator(format);
        case 'time':
            return timeRangeValidator(format);
        case 'numeric':
            return numericRangeValidator(format);
        case 'datetime':
            return datetimeRangeValidator(format);
    }
}

const dateRangeValidator = (format) => {
    return rangeValidator(format, isDate, rangeToDate, valueToDate, dateCmp);
}

const timeRangeValidator = (format) => {

}

const numericRangeValidator = (format) => {
    return rangeValidator(format, isNumber, toNumber, toNumber, numericCmp);
}

const datetimeRangeValidator = (format) => {

}

const rangeValidator = (format, validInput, rangeConverter, dataConverter, comparator) => {
    var range = format.range;
    if (range) {
        var min = rangeConverter(range.min, format);
        var max = rangeConverter(range.max, format);
        var minValid = validInput(min, format);
        var maxValid = validInput(max, format);

        if (minValid) {
            if (maxValid) {
                return (value) => {
                    let val = dataConverter(value, format);
                    return comparator(min, val) && comparator(val, max);
                }
            } else {
                return (value) => {
                    let val = dataConverter(value, format);
                    return comparator(min, val)
                }
            }
        } else {
            if (maxValid) {
                return (value) => {
                    let val = dataConverter(value, format);
                    return comparator(val, max);
                }
            }
        }
    }
}

export default RangeValidator;