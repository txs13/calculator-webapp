import React, {useState, useReducer, useEffect, useContext, useMemo} from "react";
import CalcButton from "./calculator-components/CalcButton";
import CurrentExpression from "./calculator-components/CurrentExpression";
import CurrentValue from "./calculator-components/CurrentValue";
import { DIGIT, MATH_OPERATION, OPERATION, getButtonByName, getButtonById } from "./calculator-components/buttons-static-values";
import { calculatorReducer } from "./reducer/calculator-reducer";
import { ExpressionsContext } from '../App.js'

export const defaultState = {
    currentValue: ['0'],
    currentExpression: [],
    valueIsAdded: false,
    isCalculated: false,
    isError: false
}

const Calculator = ({copiedExpression}) => {

    const [state, dispatch] = useReducer(calculatorReducer, defaultState)
    const [currentValueString, setCurrentValueString] = useState('')
    const [currentExpressionString, setCurrentExpressionString] = useState('')
    const [runUpload, setRunUpload] = useState(false)


    const expressionsData = useContext(ExpressionsContext)

    useEffect(() => {
        //effect
        if (Object.keys(copiedExpression).length !== 0) {
            dispatch({type: "COPY_EXPRESSION", payload: copiedExpression})
            //console.log(copiedExpression);
        }

        return () => {
            //cleanup
        }
    }, [copiedExpression])


    useMemo(()=>{
        let expression = [...state.currentExpression]
        let lastOperator = {type: "", value: ""}
        if (expression.length>0) {
            lastOperator= expression[expression.length-1]
        }
        if (lastOperator.value === "=" && runUpload) {
            
            expressionsData.saveExpression(expression)
            setRunUpload(false)
            //setTimeout(()=>{
            //    expressionsData.setInitDBUpdate(true)
            //},10000)
        }
    },[state.currentExpression,runUpload,expressionsData])

    useEffect(()=>{
        let valueString = state.currentValue.join('')
        setCurrentValueString(valueString)
        let expressionArr = []
        if (state.currentExpression.length>0) {
            expressionArr = state.currentExpression.map((it)=>{
                return it.value
            })
            setCurrentExpressionString(expressionArr.join(' '))
                
        } else {
            setCurrentExpressionString('')
        }
    },[state])

    const onClickButtonHandler = (buttonId) => {
        const currentButton = getButtonById(buttonId)
        
        if (currentButton.type === DIGIT && !state.isCalculated) {
            // first digit input processing
            if (state.currentValue.length === 1
                && state.currentValue[0] === '0') {
                dispatch({type: 'FIRST_DIGIT', payload: currentButton.value})
            }
            // another digit input processing
            if(state.currentValue[0] !== '0' || state.currentValue.length > 1) {
                dispatch({type: 'ANOTHER_DIGIT', payload: currentButton.value})
            }
        }

        if (currentButton.type === MATH_OPERATION && !state.isCalculated) {
            // math operation processing
            dispatch({type: 'MATH_OPERATION', payload: currentButton.value})

        }

        if (currentButton.type === OPERATION && !state.isCalculated) {
            switch (currentButton.name) {
                case "equal":
                    dispatch({type:"CALCULATE", payload: currentButton.value})
                    setRunUpload(true)
                    break;
                case "clear-expression":
                    dispatch({type:"CLEAR_EXPRESSION", payload: currentButton.value})
                    break;
                case "clear-value":
                    dispatch({type:"CLEAR_VALUE", payload: currentButton.value})
                    break;
                case "backspace":
                    dispatch({type:"DELETE_SYMBOL", payload: currentButton.value})
                    break;
                case "negative":
                    dispatch({type:"MULTIPLY_MINUS_ONE", payload: currentButton.value})
                    break;
                default:
                    throw new Error(`Wrong button value ${currentButton.value}`)
            }
        }

        const calcState = state.isError || state.isCalculated

        if (currentButton.name === "clear-expression" && calcState) {
            dispatch({type:"CLEAR_EXPRESSION", payload: currentButton.value})
        }

    }

    return (
        <div id="calculator">
            <CurrentExpression currentExpression={currentExpressionString}/>
            <CurrentValue currentValue={currentValueString}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("clear-expression")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("clear-value")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("backspace")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("plus")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("seven")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("eight")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("nine")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("minus")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("four")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("five")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("six")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("multiply")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("one")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("two")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("three")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("divide")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("dot")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("zero")}/>
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("negative")}/> 
            < CalcButton onClickHandler={onClickButtonHandler} button={getButtonByName("equal")}/>
        </div>
    )
}

export default Calculator