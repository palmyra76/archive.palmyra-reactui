
const getDisplayValue = (value, field) => {
    const type = field.type || 'string';
    switch (type) {
        case 'date':
            return getDateField(value, field);
        case 'radio':
            return getRadioField(value, field);
        case 'select':
            return getSelectField(value, field);
        case 'datetime':
            return getDateTimeField(value, field);
        case 'textarea':
            return getTextArea(value, field);
        default:
            return getTextField(value, field);
    }
}

const getValueByKey = (fieldName, data) => {
    if (data === undefined || data == null) {
        return undefined;
    }

    var index = fieldName.indexOf('.')
    if (index < 0) {
        return data[fieldName];
    }

    var objKey = fieldName.substring(0, index);
    var fieldKey = fieldName.substring(index + 1);

    return getValueByKey(fieldKey, data[objKey]);
}

const getDateField = (value, field) => {
    //TODO : value to be converted
    return <div>{value}</div>;
}

const getDateTimeField = (value, field) => {
    //TODO : value to be converted
    return <div>{value}</div>;
}

const getTextField = (value, field) => {
    return value;
}

const getRadioField = (value, field) => {
    var options = field.options;
    return <div>{options[value]}</div>;;
}

const getSelectField = (value, field) => {
    var options = field.options;
    return <div>{options[value]}</div>;;
}

const getTextArea = (value, field) => {
    return value;
}

export { getValueByKey, getDisplayValue };