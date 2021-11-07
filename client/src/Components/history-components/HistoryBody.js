import React, { useContext } from "react";
import ExpressionItem from "./ExpressionItem";
import { ExpressionsContext } from "../../App";

const HistoryBody = () => {

    const expressionsData = useContext(ExpressionsContext)
    //console.log(expressionsData.allExpressions);

    return (
        <div id="history-body">
            {expressionsData.allExpressions.sort((a,b)=>b.usesCount - a.usesCount).map((expression)=>{
                return(<ExpressionItem expression={expression} key={expression._id}/>)
            })}
        </div>
    )
}

export default HistoryBody