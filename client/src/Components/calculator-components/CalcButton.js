import React from 'react'

const CalcButton = ({button,onClickHandler}) => {
    return (
        <div className="calc-button"
            id={button.name}
            onClick={()=>onClickHandler(button.id)}>
            <p>{button.value}</p>
        </div>
    )
}


export default CalcButton