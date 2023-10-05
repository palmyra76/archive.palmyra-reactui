// title, collapse

const SectionContainer = (props) => {

    const title = props.title;

    return (
        <div>
            {(title) ? (
                <div className="palmyra-form-section-header">{title}</div>) : ''
            }
            {props.children}
        </div>
    )
}

export default SectionContainer;