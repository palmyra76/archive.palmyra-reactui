import React, { useEffect, useState } from 'react';
import { default as DefaultFieldContainer } from '../container/FieldContainer';
import { getValueByKey, getDisplayValue } from '../util/ValueUtil';
import './FormRenderer.css';

const FormViewRenderer = (props) => {
    const { formLayout } = props;
    const [data, setData] = useState(props.data);
    const FieldContainer = props.FieldContainer || DefaultFieldContainer;

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    const getField = (field) => {
        const value = getValueByKey(field.attribute, data);
        const displayValue = getDisplayValue(value, field);
        return <div>{displayValue}</div>
    }

    var columns = formLayout.options?.columns || 1;
    var topLabel = formLayout.options?.topLabel || false;
    var options = { columns, topLabel };

    return (
        <div className="palmyra-form-field-container-wrapper">
            {
                formLayout.fields.map((field, index) => (
                    <FieldContainer label={field.label} field={field}
                        key={field.attribute}
                        options={options} index={index}>
                        {getField(field)}
                    </FieldContainer>
                ))
            }
        </div>
    );
};

export default FormViewRenderer;
