import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const ValidationDatePicker = (props) => {
    const dataFormat = props.dataFormat || "YYYY-MM-DD";
    const [name, setName] = useState(props.name);

    const parseDate = (val) => {
        return dayjs(val, dataFormat)
    }

    const formatDate = (val) => {
        return dayjs(val).format(dataFormat)
    }

    const [error, setError] = useState({ status: false, message: "" });
    const [data, setData] = useState(parseDate(props.value));

    const onChange = (inputValue) => {
        setData(inputValue);
        if (inputValue) {
            const [status, message] = checkConstraints(inputValue);
            setError({
                status: !status
            });
        }

        if (props.onDataChange) {
            var v = formatDate(inputValue);
            if (name) {
                props.onDataChange({ [name]: v })
            }
        }
    };

    const validate = (e) => {
        if (e) {
            const inputValue = e.target.value;

            const [status, message] = checkConstraints(inputValue);
            setError({
                status: !status,
                message: message
            });
        }
    }

    const clearError = () => {
        setError({
            message: ''
        });
    }

    const checkConstraints = (value) => {
        const constraint = props.constraint;
        if (constraint && constraint instanceof Function) {
            return constraint(value);
        }
        return [false, ''];
    };

    const inputProps = { ...props, value: data };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker {...inputProps}
                onChange={onChange}
                onBlur={validate}
                onFocus={clearError}
                onEmpty={validate}
                error={error.status}
                helperText={error.message}
            />
        </LocalizationProvider>
    );
}

export default ValidationDatePicker;