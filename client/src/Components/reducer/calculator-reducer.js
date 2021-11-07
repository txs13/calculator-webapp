import { hasDot, inlineCalculation } from './reducer-utils.js'
import { defaultState } from '../Calculator.js'

export const calculatorReducer = (state, action) => {
    
    if (action.type === 'FIRST_DIGIT') {
        let newValue = [...state.currentValue]
        if (action.payload === '.') {
            newValue = [...newValue, action.payload]
        } else {
            newValue[0] = action.payload.toString()
        }
        return {...state, currentValue: newValue, valueIsAdded: false}
    }

    if (action.type === 'ANOTHER_DIGIT') {
        let newValue = [...state.currentValue]
        if (newValue[0]==="-"
            && newValue[1]==="0"
            && newValue[2]!=="."
            && newValue[2]!==undefined) {
            newValue[1] = action.payload
        } else {
            if (action.payload === '.' && !hasDot(state)) {
                newValue = [...newValue, action.payload]
            }
            if (action.payload !== '.') {
                newValue = [...newValue, action.payload.toString()]
            }
        }
        return {...state, currentValue: newValue, valueIsAdded: false}
    }

    if (action.type === 'MATH_OPERATION') {
        const newValue = Number(state.currentValue.join(''))
        let valueIsAdded = state.valueIsAdded
        let newExpression = [...state.currentExpression]
        if (!valueIsAdded) {
            newExpression = [...newExpression,
                {
                    type: "VALUE",
                    value: newValue
                },
                {
                    type: "OPERATION",
                    value: action.payload
                }]
            valueIsAdded = true    
        } else {
            if (state.currentExpression.length >= 2) {
                newExpression[newExpression.length-1] = {
                    type: "OPERATION",
                    value: action.payload                    
                }
            }
        }
        return {...state,
            currentExpression: newExpression,
            valueIsAdded: valueIsAdded,
            currentValue: ["0"]}
    }

    if (action.type === "CALCULATE") {
        const result = inlineCalculation(state)
        let currentValue = []
        let currentExpression = []

        if (result.status === "SUCCESS") {
            currentExpression = [...result.updatedExpression]
            currentExpression.push({
                type: "OPERATION",
                value: "="
            })
            currentValue = [...result.result]
            return { currentValue,
                currentExpression,
                valueIsAdded: false,
                isCalculated: true,
                isError: false,
            }
        }

        if (result.status === "FAILURE") {
            return {currentValue: result.result,
                currentExpression: [],
                valueIsAdded: false,
                isCalculated: true,
                isError: true,
            }
        }

        return {...state}        
    }

    if (action.type === "CLEAR_EXPRESSION") {
        return defaultState        
    }

    if (action.type === "CLEAR_VALUE") {
        return {...state, currentValue: ["0"], valueIsAdded: false}        
    }    

    if (action.type === "DELETE_SYMBOL") {
        let newValue = [...state.currentValue]
        if (newValue.length>1 && newValue[0] !== "-") {
            newValue.pop()
        } else {
            newValue = ["0"]
        }
        return {...state, currentValue: newValue}        
    }

    if (action.type === "MULTIPLY_MINUS_ONE") {
        let newValue = [...state.currentValue]
        if (newValue[0]==='-') {
            newValue.shift()
        } else {
            newValue.unshift('-')
        }
        return {...state, currentValue: newValue}        
    }

    if (action.type === "COPY_EXPRESSION") {
        let copiedExpression = [...action.payload.expression]
        let expression = [...copiedExpression]
        expression.pop()
        let value = expression[expression.length -1].value
        expression.pop()
        //console.log(expression, value);
        const valueStr = value.toString()
        const valueArr = valueStr.split('')

        return {currentValue: [...valueArr],
            currentExpression: [...expression],
            valueIsAdded: false,
            isCalculated: false,
            isError: false,
        }
    }

    throw new Error('no matching action type')
}