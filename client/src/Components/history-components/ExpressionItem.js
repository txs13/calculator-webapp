import React, { useContext } from "react";
import HistoryButton from "./HistoryButton";
import {calculateArray, calculateTimeDiff} from "./calculate-utils";
import { ExpressionsContext } from "../../App";

const ExpressionItem = ({expression}) => {

    const expressionsData = useContext(ExpressionsContext)

    const clickHandler = (name) => {
        if (name==="del") {
            expressionsData.deleteExpression(expression._id)
        }

        if (name === "like") {
            expressionsData.likeExpression(expression._id)
        }

        if (name === "copy") {
            expressionsData.copyExpression(expression._id)
        }
    }
    //console.log(expression);

    const timeString = calculateTimeDiff(expression.createdAt)

    const makeStringExpression = (expression) => {
        const expressionArr = expression.expression.map((it)=>{return it.value})
        const calculatedExpressionArr = calculateArray(expressionArr)
        return calculatedExpressionArr.join(' ')
    }

    const expressionString = makeStringExpression(expression)

    return (
        <div className="history-item">
            <p className="history-item-expression">{expressionString}</p>
            <p className="history-item-date">{timeString}</p>
            <p className="history-item-likes">{expression.usesCount} likes</p>
            <HistoryButton name="copy" clickHandler={clickHandler}/>
            <HistoryButton name="like" clickHandler={clickHandler}/>
            <HistoryButton name="del" clickHandler={clickHandler}/>
        </div>
    )
}

export default ExpressionItem