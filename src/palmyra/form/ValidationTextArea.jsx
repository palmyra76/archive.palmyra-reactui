import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { TextField } from '@mui/material';

const ValidationTextArea = forwardRef(function ValidationTextArea(props, ref) {
    const [error, setError] = useState({ status: false, message: "" });
    const [data, setData] = useState(props.value);
    const [name, setName] = useState(props.name);
    const inputRef = useRef(null);

    const onDataChange = props.onDataChange;
    const constraint = props.constraint;

    useImperativeHandle(ref, () => {
        return {
            focus() {
                inputRef.current.focus();
            },
            isValid() {
                return !error.status;
            }
        };
    }, []);

    useEffect(() => {
        setData(props.value);
    }, [props.value]);

    const onChange = (e) => {
        const inputValue = e.target.value;
        setData(inputValue);
        if (inputValue) {
            const [status, message] = checkConstraints(inputValue);
            var msg = status ? "" : message;

            if (error.status == status
                || error.message != msg) {
                setError({
                    status: !status,
                    message: msg
                });
            }
        }

        if (onDataChange) {
            if (name) {
                onDataChange({ [name]: inputValue })
            } else
                onDataChange(e);
        }
    };

    const validate = (e) => {
        if (e) {
            const inputValue = e.target.value;
            const [status, message] = checkConstraints(inputValue);

            if (error.status == status
                || error.message != message) {
                setError({
                    status: !status,
                    message: message
                });
            }
        }
    }

    const clearError = () => {
        if (error.status && error.message != "") {
            setError({
                status: error.status,
                message: ""
            });
        }
    }

    const checkConstraints = (value) => {
        if (constraint && constraint instanceof Function) {
            return constraint(value);
        }
        return [false, ''];
    };

    var inputProps = { fullWidth: true, ...props, value: data };

    delete inputProps.constraint;
    delete inputProps.onDataChange;

    return (
        <TextField {...inputProps}
            minRows={2}
            maxRows={5}
            multiline
            style={{ width: '100%', overflow: 'auto', fontSize: "20px" }}
            inputRef={inputRef}
            onChange={onChange}
            onBlur={validate}
            onFocus={clearError}
            error={error.status}
            helperText={error.message}
        />
    );
});

export default ValidationTextArea;