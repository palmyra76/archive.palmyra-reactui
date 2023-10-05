import React, { useState, useEffect, useMemo, useRef, useImperativeHandle, forwardRef } from 'react';
import { default as DefaultFieldContainer } from '../container/FieldContainer';
import ValidationTextField from '../ValidationTextField';
import ValidationDatePicker from '../ValidationDatePicker';
import PalmyraRadioGroup from '../PalmyraRadioGroup';
import PalmyraSelect from '../PalmyraSelect';
import './FormRenderer.css';
import ValidationDateTimePicker from '../ValidationDateTimePicker';
import ValidationTextArea from '../ValidationTextArea';

const FormRenderer = forwardRef(function FormRenderer(props, ref) {
    const { formLayout, rules, onDataChange } = props;
    console.log(DefaultFieldContainer);
    const FieldContainer =  DefaultFieldContainer;
    const [data, setData] = useState(props.data);
    const fieldRefs = useRef({});

    const updateData = (kv) => {
        var newData = { ...data };
        for (var field in kv) {
            var value = kv[field];
            setValueByKey(field, newData, value);
        }
        setData(newData);
        setSubmitStatus(kv, newData);
    };

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    const _focus = () => {
        var firstField = formLayout.fields[0];
        var inputRef = fieldRefs.current[firstField.attribute];
        if (inputRef) {
            inputRef.focus();
        }
    }

    const _focusErrorInput = () => {
        for (var field of formLayout.fields) {
            var inputRef = fieldRefs.current[field.attribute];
            if (inputRef && inputRef.valid && inputRef.focus) {
                if (!inputRef.isValid()) {
                    inputRef.focus();
                    return true;
                }
            }
        }
        return false;
    }

    useImperativeHandle(ref, () => {
        return {
            focus() {
                _focus();
            },
            focusErrorInput() {
                return _focusErrorInput();
            }
        };
    }, []);

    const setSubmitStatus = (kv, newData) => {
        var dValid = {};
        for (var field in kv) {
            var value = kv[field];
            var validator = rules[field];
            var [isValid] = validator(value);
            dValid[field] = isValid;
        }
        onDataChange({ data: newData, dataValid: dValid });
    }

    const getField = useMemo(() => (field) => {
        const type = field.type || 'string';
        switch (type) {
            case 'date':
                return getDateField(field);
            case 'radio':
                return getRadioField(field);
            case 'select':
                return getSelectField(field);
            case 'datetime':
                return getDateTimeField(field);
            case 'textarea':
                return getTextArea(field);
            default:
                return getTextField(field);
        }
    }, [data]);

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

    const getValue = (field, data) => {
        return getValueByKey(field.attribute, data);
    }

    const setValueByKey = (fieldName, data, value) => {

        var index = fieldName.indexOf('.')
        if (index < 0) {
            data[fieldName] = value;
            return;
        }

        var objKey = fieldName.substring(0, index);
        var fieldKey = fieldName.substring(index + 1);

        if (data[objKey] === undefined || data[objKey] == null) {
            data[objKey] = {};
        }

        return setValueByKey(fieldKey, data[objKey], value);
    }

    const getDateField = (field) => {
        var fieldProps = getFieldProps(field, data)
        return <ValidationDatePicker
            {...fieldProps}
            dataFormat="YYYY-MM-DD"
            format="DD-MM-YYYY"
            slotProps={{ textField: { variant: 'standard', fullWidth: true } }}
        />;
    }

    const getDateTimeField = (field) => {
        var fieldProps = getFieldProps(field, data)
        return <ValidationDateTimePicker
            {...fieldProps}
            dataFormat="DD-MM-YYYY hh:mm a"
            format="DD-MM-YYYY hh:mm a"
            slotProps={{ textField: { variant: 'standard', fullWidth: true } }}
        />;
    }

    const getTextField = (field) => {
        var fieldProps = getFieldProps(field, data)
        return <ValidationTextField
            ref={ref => {
                fieldRefs.current[field.attribute] = ref;
            }}
            {...fieldProps}
            constraint={rules[field.attribute]}
        />;
    }

    const getRadioField = (field, data) => {
        var fieldProps = getFieldProps(field, data)
        const options = field.options || {};

        return <PalmyraRadioGroup
            {...fieldProps}
            options={options}
        />;
    }

    const getSelectField = (field) => {
        var fieldProps = getFieldProps(field, data)
        const options = field.options || {};

        return <PalmyraSelect
            {...fieldProps}
            menu={options}
        />;
    }

    const getTextArea = (field) => {
        var fieldProps = getFieldProps(field, data)
        return <ValidationTextArea
            ref={ref => {
                fieldRefs.current[field.attribute] = ref;
            }}
            {...fieldProps}
            constraint={rules[field.attribute]}
        />;
    }

    const getFieldProps = (field) => {
        var fieldValue = getValue(field, data);
        var disabled = field.disabled;
        var variant = field.variant || "standard";
        if (disabled) {
            return {
                disabled: disabled,
                value: fieldValue,
                name: field.attribute,
                variant
            };
        } else {
            return {
                value: fieldValue,
                name: field.attribute,
                variant,
                onDataChange: updateData
            }
        }
    }

    var columns = formLayout.options?.columns || 1;
    var topLabel = formLayout.options?.topLabel || false;
    var options = { columns, topLabel };

    return (
        <div className="palmyra-form-field-container-wrapper">
            {
                formLayout.fields.map((field, index) => (
                    <FieldContainer key={field.attribute} index={index}
                        field={field} label={field.label} options={options}>
                        {getField(field)}
                    </FieldContainer>
                ))
            }
        </div>
    );
});

export default FormRenderer;
