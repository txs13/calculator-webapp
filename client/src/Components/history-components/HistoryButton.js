import React from "react";

const HistoryButton = ({name, clickHandler}) => {

    return (
        <div className={`history-button ${name}`} onClick={()=>clickHandler(name)}>
            <p>{name}</p>
        </div>    
    )
}

export default HistoryButton