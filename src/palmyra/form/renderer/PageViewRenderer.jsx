import React, { useState, useMemo, useEffect } from 'react';

import SectionRenderer from './SectionRenderer';
import FormViewRenderer from './FormViewRenderer';

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

/**
 * layout - Page layout 
 * data - The form data
 *  */
const PageViewRenderer = (props) => {
    const { layout, data } = props;
    const SectionContainer = props.SectionContainer || DefaultSectionContainer;
    const FieldContainer = props.FieldContainer || DefaultFieldContainer;
    const TabContainer = props.TabContainer || DefaultTabContainer;

    const sections = layout.tabs[0].sections;

    return (
        <SectionRenderer
            SectionContainer={SectionContainer} FieldContainer={FieldContainer}
            data={data} sections={sections} FormRndr = {FormViewRenderer}
        ></SectionRenderer>
    )
}

export default PageViewRenderer;