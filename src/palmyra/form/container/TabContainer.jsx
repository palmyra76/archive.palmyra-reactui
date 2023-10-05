// title, closeable

const TabContainer = (props) => {

    const title = props.title;

    return (
        <div>
            <h2>{title}</h2>
            {props.children}
        </div>
    )
}

export default TabContainer;