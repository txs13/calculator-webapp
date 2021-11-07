export const hasDot = (state) => {
    const filteredValue = state.currentValue.filter((it)=>it === '.')
    switch (filteredValue.length) {
        case 0:
            return false
        case 1:
            return true
        default:
            throw new Error('Check the decimal dot algorythm!!!!')
    }
}

export const inlineCalculation = (state) => {
    let currentValue = Number(state.currentValue.join(''))
    let currentExpression = [...state.currentExpression]
    let result = 0
    const error = 'Error'

    if (currentValue === 0) {
        currentExpression.pop()
    } else {
        currentExpression.push(
            {
                type: "VALUE",
                value: currentValue
            })
    }

    let experssionArr = currentExpression.map((it)=>{
        return it.value
    })

    if (experssionArr.length >= 3) {
        for (let i=0; i <= currentExpression.length-3; i=i+2) {
            const var1 = experssionArr[i]
            const oper = experssionArr[i+1]
            const var2 = experssionArr[i+2]

            try {
                switch(oper) {
                    case "+":
                        experssionArr[i+2] = var1 + var2
                        break;
                    case "-":
                        experssionArr[i+2] = var1 - var2
                        break;
                    case "*":
                        experssionArr[i+2] = var1 * var2
                        break;
                    case "/":
                        experssionArr[i+2] = var1 / var2
                        break;
                    default:
                        throw new Error(`Wrong math operator ${oper}`)    
                }                
            } catch (err) {
                return {status: "FAILURE", result: error.split('')}
            }
        }
        result = experssionArr[experssionArr.length-1]
        let resultStr = result.toString()
        
        return {status:"SUCCESS", result: resultStr.split(''), updatedExpression: currentExpression}
    } else {
        return {status: "FAILURE", result: error.split('')}
    }

}