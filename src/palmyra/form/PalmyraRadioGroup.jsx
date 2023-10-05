import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React, { useState, useEffect } from 'react';


const PalmyraRadioGroup = (props) => {
    const [data, setData] = useState(props.value);
    const [name, setName] = useState(props.name);
    const {options} = props;

    const onDataChange = props.onDataChange;
    
    useEffect(() => {
        setData(props.value);
    }, [props.value]);

    const onChange = (e) => {
        const inputValue = e.target.value;
        setData(inputValue);

        if (onDataChange) {
            if (name) {
                onDataChange({ [name]: inputValue })
            } else
                onDataChange(e);
        }
    };

    var inputProps = { ...props, value: data };

    delete inputProps.constraint;
    delete inputProps.onDataChange;
    delete inputProps.options;

    return (
        <RadioGroup row {...inputProps}>
            {Object.keys(options).map((key, index) => (
                <FormControlLabel value={key} control={<Radio />} label={options[key]} onChange={onChange} />
                )
            )}
        </RadioGroup>
    );
};

export default PalmyraRadioGroup;