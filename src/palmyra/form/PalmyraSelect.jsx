import { MenuItem, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';

const PalmyraSelect = (props) => {
    const [data, setData] = useState(props.value);
    const [name, setName] = useState(props.name);
    const { menu } = props;

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
    delete inputProps.menu;

    return (
        <Select {...inputProps} onChange={onChange}>
            {Object.keys(menu).map((key, index) => (
                <MenuItem value={key}>{menu[key]}</MenuItem>
            )
            )}
        </Select>
    );
};

export default PalmyraSelect;