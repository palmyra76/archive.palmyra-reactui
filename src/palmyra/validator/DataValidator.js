import validator from 'validator';

import RangeValidator from './RangeValidator';
import { isHost, isFolder } from './Validation';

const getValidators = (fieldDefs) => {
    let fieldValidators = {};
    for (var key in fieldDefs) {
        var fieldDef = fieldDefs[key];
        const validator = validate(fieldDef);
        fieldValidators[key] = validator;
    }
    return fieldValidators;
}

const validate = (format) => {
    let validators = [];

    if (format.required) {
        var message = format.errorMessageRequired || 'This field is mandatory';
        validators.push(constructMethod(isNotEmpty, message));
    }

    var typeValidator = getTypeValidator(format);
    var typeMessage = format.errorMessageType || "Invalid";
    validators.push(constructMethod(typeValidator, typeMessage));

    if (format.length) {
        var lengthMessage = format.length.message || 'Invalid size';
        validators.push(constructMethod(getLengthValidator(format), lengthMessage));
    }

    if (format.range) {
        var validatorMethod = RangeValidator(format);
        if (validatorMethod) {
            var rangeMessage = format.range.message || 'Invalid value';
            validators.push(constructMethod(validatorMethod, rangeMessage));
        }
    }

    return (value) => {
        for (var validator of validators) {
            const result = validator.call(null, value);
            if (!result[0])
                return result;
        }
        return [true, ''];
    }
}

const getLengthValidator = (format) => {
    if (format.length) {
        const length = format.length.is;
        const minLength = format.length.min;
        const maxLength = format.length.max;

        if (length) {
            return (val) => { return val.length == length; };
        } else if (minLength) {
            if (maxLength) {
                return (val) => {
                    const l = val.length;
                    return minLength <= l && l <= maxLength;
                }
            } else {
                return (val) => {
                    return minLength <= val.length;
                }
            }
        } else {
            if (maxLength) {
                return (val) => {
                    return val.length <= maxLength;
                }
            }
        }
    }
}

const getFormatValidator = (format) => {

}

const getConstraintValidator = (format) => {

}

const getRangeValidator = (format) => {

}

const getTypeValidator = (format) => {
    var type = format.type;
    if (type) {
        switch (type) {
            case 'string':
                return noopValid;
            case 'alphabets':
                return validator.isAlpha;
            case 'date':
                return validator.isDate;
            case 'time':
                return validator.isTime;
            case 'number':
                return validator.isNumeric;
            case 'email':
                return validator.isEmail;
            case 'mobilePhone':
                return validator.isMobilePhone;
            case 'port':
                return validator.isPort;
            case 'ip':
                return validator.isIP;
            case 'fqdn':
                return validator.isFQDN;
            case 'host':
                return isHost;
            case 'folder':
                return isFolder;
        }
    }
    return noopValid;
}

const noopValid = () => {
    return true;
}

const isNotEmpty = (val) => {
    if (val == undefined || val == null) {
        return false;
    }
    return !validator.isEmpty(val);
}

function constructMethod(func, message) {
    return (val) => {
        if (func.call(null, val)) {
            return [true, ''];
        } else {
            return [false, message];
        }
    };
}

export default validate;

export { getValidators };