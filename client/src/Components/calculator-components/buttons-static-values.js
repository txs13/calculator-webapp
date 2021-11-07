export const DIGIT = "DIGIT"
export const OPERATION = "OPERATION"
export const MATH_OPERATION = "MATH_OPERATION"

export const BUTTONS = [
    {
        id: 0,
        name: "zero",
        value: 0,
        type: DIGIT
    },
    {
        id: 1,
        name: "one",
        value: 1,
        type: DIGIT
    },
    {
        id: 2,
        name: "two",
        value: 2,
        type: DIGIT
    },
    {
        id: 3,
        name: "three",
        value: 3,
        type: DIGIT
    },
    {
        id: 4,
        name: "four",
        value: 4,
        type: DIGIT
    },
    {
        id: 5,
        name: "five",
        value: 5,
        type: DIGIT
    },
    {
        id: 6,
        name: "six",
        value: 6,
        type: DIGIT
    },
    {
        id: 7,
        name: "seven",
        value: 7,
        type: DIGIT
    },
    {
        id: 8,
        name: "eight",
        value: 8,
        type: DIGIT
    },
    {
        id: 9,
        name: "nine",
        value: 9,
        type: DIGIT
    },
    {
        id: 10,
        name: "dot",
        value: ".",
        type: DIGIT
    },
    {
        id: 11,
        name: "backspace",
        value: "del",
        type: OPERATION
    },
    {
        id: 12,
        name: "plus",
        value: "+",
        type: MATH_OPERATION
    },
    {
        id: 13,
        name: "minus",
        value: "-",
        type: MATH_OPERATION
    },
    {
        id: 14,
        name: "multiply",
        value: "*",
        type: MATH_OPERATION
    },
    {
        id: 15,
        name: "divide",
        value: "/",
        type: MATH_OPERATION
    },
    {
        id: 16,
        name: "clear-value",
        value: "C",
        type: OPERATION
    },
    {
        id: 17,
        name: "clear-expression",
        value: "CE",
        type: OPERATION
    },
    {
        id: 18,
        name: "equal",
        value: "=",
        type: OPERATION
    },
    {
        id: 19,
        name: "negative",
        value: "+/-",
        type: OPERATION
    },
        
]

export const getButtonByName = (name) => {
    const button = BUTTONS.filter((it)=>it.name === name)
    if (button.length === 1) {
        return button[0]
    } else {
        throw new Error('wrong BUTTONS array value(s)!!!!')
    }
}

export const getButtonById = (id) => {
    const button = BUTTONS.filter((it)=>it.id === id)
    if (button.length === 1) {
        return button[0]
    } else {
        throw new Error('wrong BUTTONS array value(s)!!!!')
    }
}