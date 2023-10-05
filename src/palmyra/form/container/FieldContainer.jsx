
const calcContainerClass = (options,field) => {
    var containerClass = 'palmyra-form-field-container';
    if (options && options.columns) {
        switch (options.columns) {
            case 2:
            case '2':
                if(field.columnWrap && field.columnWrap > 1)
                    return containerClass;
                return containerClass + ' palmyra-form-field-container-2column';
            case 3:
            case '3':
                return containerClass + ' palmyra-form-field-container-3column';
            case 4:
            case '4':
                return containerClass + ' palmyra-form-field-container-4column';
        }
    }
    return containerClass;
}

var calcFieldLabelClass = (options, field) => {
    var labelClass = 'palmyra-form-field-label';
    var fieldClass = 'palmyra-form-field-data';
    
    if (field.topLabel || options && options.topLabel) {
        return {
            labelClass: 'palmyra-form-field-label palmyra-form-field-label-topLabel',
            fieldClass: 'palmyra-form-field-data palmyra-form-field-data-topLabel'
        }
    } else {
        return { labelClass, fieldClass };
    }
}


const FieldContainer = ({ label, children, options, field }) => {
    const containerClass = calcContainerClass(options, field);
    const { labelClass, fieldClass } = calcFieldLabelClass(options, field);

    return (
        <div className={containerClass}>
            <div className={labelClass}>
                {label}
            </div>
            <div className={fieldClass}>
                {children}
            </div>
        </div>
    )
}

export default FieldContainer;