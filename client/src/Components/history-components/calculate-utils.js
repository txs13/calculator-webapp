export const calculateArray = (expressionArr) => {
    let currentExpressionArr = [...expressionArr]
    let serviceExpressionArr = [...expressionArr]
    let result = 0
    //console.log(serviceExpressionArr);
    serviceExpressionArr.pop()
    //console.log(serviceExpressionArr);

    for (let i=0; i <= serviceExpressionArr.length-3; i=i+2) {
        const var1 = serviceExpressionArr[i]
        const oper = serviceExpressionArr[i+1]
        const var2 = serviceExpressionArr[i+2]

        try {
            switch(oper) {
                case "+":
                    serviceExpressionArr[i+2] = var1 + var2
                    break;
                case "-":
                    serviceExpressionArr[i+2] = var1 - var2
                    break;
                case "*":
                    serviceExpressionArr[i+2] = var1 * var2
                    break;
                case "/":
                    serviceExpressionArr[i+2] = var1 / var2
                    break;
                default:
                    throw new Error(`Wrong math operator ${oper}`)    
            }                
        } catch (err) {
            throw new Error(`Math error ${err}`)
        }
    }
    result = serviceExpressionArr[serviceExpressionArr.length-1]
    currentExpressionArr.push(result)
        
    return currentExpressionArr
}

export const calculateTimeDiff = (date) => {
    const today = new Date()
    const recordDate = new Date(date)
    console.log(recordDate);
    console.log(today);
    let d = Math.abs(today - recordDate) / 1000;                           // delta
    let r = {};                                                                // result
    let s = {                                                                  // structure
        year: 31536000,
        month: 2592000,
        week: 604800, // uncomment row to ignore
        day: 86400,   // feel free to add your own row
        hour: 3600,
        minute: 60,
        second: 1
    };

    Object.keys(s).forEach(function(key){
        r[key] = Math.floor(d / s[key]);
        d -= r[key] * s[key];
    });

// for example: {year:0,month:0,week:1,day:2,hour:34,minute:56,second:7}
console.log(r);

    if (r.year > 0) {
        if (r.year === 1) {
            return `a year ago`
        } else {
            return `${r.year} years ago`
        }
    }

    if (r.month > 0) {
        if (r.month === 1) {
            return `a month ago`
        } else {
            return `${r.month} months ago`
        }
    }

    if (r.week > 0) {
        if (r.week === 1) {
            return `a week ago`
        } else {
            return `${r.week} weeks ago`
        }
    }

     if (r.day > 0) {
        if (r.day === 1) {
            return `a day ago`
        } else {
            return `${r.day} days ago`
        }
    }

    if (r.hour > 0) {
        if (r.hour === 1) {
            return `an hour ago`
        } else {
            return `${r.hour} hours ago`
        }
    }

    if (r.minute > 0) {
        if (r.minute === 1) {
            return `a minute ago`
        } else {
            return `${r.minute} minutes ago`
        }
    }

    if (r.second > 0) {
            return `${r.second} seconds ago`
        
    }
    
return "seconds ago"
} 