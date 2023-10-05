import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import AbstractDataStore from "../../palmyra/store/AbstractDataStore";

const ServerLookup = (props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;
    const idKey = props.idKey || 'id';
    const nameKey = props.valueKey || 'name';
    const width = props.width || 300;

    let target = props.targetUrl;
    const onChangeCallback = props.onChange;

    const handleValueChange = (event, newValue, reason) => {
        let val = (newValue) ? { id: newValue[idKey], value: newValue[nameKey] } : null;
        setValue(val);

        if (onChangeCallback) {
            onChangeCallback(val);
        }
    }

    const store = new AbstractDataStore({ target })
    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        store.query({}, (d) => {
            setOptions(d.result);
        });

        return () => {
            active = false;
        };
    }, [loading]);

    let placeHolder = props.placeHolder || 'Select';

    return (
        <Autocomplete
            sx={{ width: width }}
            size="small"
            open={open}
            hiddenlabel="true"
            onChange={handleValueChange}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option[idKey] === value[idKey]}
            getOptionLabel={(option) => option[nameKey]}
            options={options}
            loading={loading}
            variant="text"
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option[idKey]}>
                        {option[nameKey]}
                    </li>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={placeHolder}
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

export default ServerLookup;