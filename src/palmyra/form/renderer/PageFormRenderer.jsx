import React, { useState, useMemo, useEffect } from 'react';

import { getValidators } from '../../validator/DataValidator';

import SectionRenderer from './SectionRenderer';

import { default as DefaultFieldContainer } from '../container/FieldContainer';
import { default as DefaultSectionContainer } from '../container/SectionContainer';
import { default as DefaultTabContainer } from '../container/SectionContainer';


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

const calcValidationStatus = (incomingData, validFunctions) => {
    var validity = {};
    for (var field in validFunctions) {
        var validator = validFunctions[field];
        var value = getValueByKey(field, incomingData);
        var [isValid] = validator(value);
        validity[field] = isValid;
    }
    return validity;
}

const getValidationFormat = (layout) => {
    var result = {};
    if (layout.tabs) {
        for (var tab of layout.tabs) {
            if (tab && tab.sections) {
                for (var section of tab.sections) {
                    if (section) {
                        var formLayout = section.formLayout;
                        if (formLayout && formLayout.fields) {
                            for (var field of formLayout.fields) {
                                result[field.attribute] = field;
                            }
                        }
                    }
                }
            }
        }
    }
    return result;
}


/**
 * layout - Page layout 
 * data - The form data
 * onDataUpdate - Method to be called on data update - replica of data
 * onValidate - callback
 *  */
const PageFormRenderer = (props) => {
    const { layout, onDataUpdate, onValidate } = props;
    const tab = layout.tabs[0];
    const sections = layout.tabs[0].sections;

    const clone = (data) => {
        return JSON.parse(JSON.stringify(data));
    }

    const [data, setData] = useState(clone(props.data));

    const validationRules = useMemo(
        () => getValidators(getValidationFormat(layout)),
        [layout]
    );

    var dataValid = calcValidationStatus(data, validationRules);

    const SectionContainer = props.SectionContainer || DefaultSectionContainer;
    const FieldContainer = props.FieldContainer || DefaultFieldContainer;
    const TabContainer = props.TabContainer || DefaultTabContainer;

    useEffect(() => {
        var d = clone(props.data);
        setData(d);
        dataValid = calcValidationStatus(d, validationRules);
    }, [props.data]);

    const onDataChange = (updateData) => {
        dataValid = Object.assign({}, dataValid, updateData.dataValid);
        var allValid = isValid(dataValid);
        console.log(dataValid);
        if (onValidate)
            onValidate(allValid);
        if (onDataUpdate)
            onDataUpdate(updateData.data);
    }

    const isValid = (dv) => {
        for (var key in dv) {
            if (dv[key] == false) {
                return false;
            }
        }
        return true;
    }

    var section = useMemo(() => {
        return (<SectionRenderer   SectionContainer={SectionContainer} FieldContainer={FieldContainer}
            data={data} rules={validationRules} sections={sections} onDataChange={onDataChange}
        ></SectionRenderer>)
    }, [data]
    )

    return <div>{section}</div>
}

export default PageFormRenderer;