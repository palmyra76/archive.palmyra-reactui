import React from 'react'
import './CardLayout.css';

const CardLayout = (props) => {
    const { children, dataList, Child, EmptyChild, childProps } = props;

    return (
        <div>{dataList.length == 0 ? (
            <EmptyChild />
        ) : (
            <div className="card-container" >
                {children}
                <div className="card-wrapper" >
                    {dataList.map((data, index) => (
                        <Child  {...childProps} data={data}></Child>
                    ))}
                </div>
            </div>)}

        </div>
    )
}
export default CardLayout;
