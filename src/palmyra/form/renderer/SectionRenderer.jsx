import React from 'react';

import FormRenderer from './FormRenderer';
import {default as DefaultSectionContainer} from '../container/SectionContainer';
import {default as DefaultFieldContainer} from '../container/FieldContainer';


const SectionRenderer = (props) => {
    const {sections, rules, data, onDataChange, FormRndr} = props;

    var Renderer = FormRndr || FormRenderer;
    const SectionContainer = props.SectionContainer || DefaultSectionContainer;
    const FieldContainer = props.FieldContainer || DefaultFieldContainer;
    
    const getFormLayout = (formLayout)=>{
        return (<Renderer rules={rules}
            FieldContainer = {FieldContainer}
        data={data} formLayout={formLayout} onDataChange={onDataChange}
    ></Renderer>) ;
    };

    return (
        <div>
            {
                sections.map((section, index) => (
                    <div key={section.name + index}>
                        {sections.length > 1 ? (<SectionContainer title={section.name}>
                            {getFormLayout(section.formLayout)}
                        </SectionContainer>) : getFormLayout(section.formLayout)}                            
                    </div>
                ))
            }
        </div>
    );
};

export default SectionRenderer;
