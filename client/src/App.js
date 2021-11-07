import React, { useState, useMemo, useEffect } from "react";
import Calculator from "./Components/Calculator";
import History from "./Components/History";
import axios from 'axios'
import { SERVER_URL, SERVER_PORT, EXPRESSIONS_API } from './api/expressions.js'

const client = axios.create({
    baseURL: `${SERVER_URL}:${SERVER_PORT}${EXPRESSIONS_API}`,
    timeout: 1000
})

const options = {
	headers: {"content-type": "application/json"}
}

export const ExpressionsContext = React.createContext()

const App = () => {

    const [initDBUpdate, setInitDBUpdate] = useState(false)
    const [allExpressions, setAllexpressions] = useState([])
    const [copiedExpression, setCopiedExpression] = useState({})

    const likeExpression = (id) => {
        client.get(`/${id}`,options)
            .then((res)=>{
                let newExpression = res.data
                newExpression.usesCount++
                //console.log(newExpression);
                client.patch(`/${id}`, newExpression, options)
                    .then((res)=>{
                        setInitDBUpdate(true)
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    const copyExpression = (id) => {
        client.get(`/${id}`,options)
            .then((res)=>{
                //console.log(res);
                setCopiedExpression(res.data)
            })
            .catch((err)=>{
                console.log(err);
            })
        likeExpression(id)    
    }

    const deleteExpression = (id) => {
       
        client.delete(`/${id}`,options)
            .then((res)=>{
                console.log(res);
            })
            .then(()=>{
                setInitDBUpdate(true)
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    const saveExpression = (expression) => {

        client.post('/', expression, options)
            .then((res)=>{
                if (res.data.status === "SUCCESS") {
                console.log("Expression was successfully saved into the database.");
                }                
            })
            .then(()=>{
                setInitDBUpdate(true)
            }).catch((err)=>{
                console.log(err);
            })
        //try {
        //    let res = await client.post('/',expression, options);
        //    let data = res.data
        //    if (data.status === "SUCCESS") {
        //        console.log("Expression was successfully saved into the database.");
        //    }
        //} catch (error) {
        //    console.log(error);
        //}
    }

    useMemo(() => {
        if (initDBUpdate) {
            client.get('/',options)
                .then((res)=>{
                    const data = res.data
                    setAllexpressions(data.expressions)
                })
                .then(()=>{
                    setInitDBUpdate(false)
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    }, [initDBUpdate])

    useEffect(()=>{
        client.get('/',options)
            .then((res)=>{
                const data = res.data
                setAllexpressions(data.expressions)
            })
            .catch((error)=>{
                console.log(error);
            })
    },[])


    return(
        <div id="canvas-base">
        <ExpressionsContext.Provider            
            value={{ saveExpression,
                setInitDBUpdate,
                allExpressions,
                deleteExpression,
                likeExpression,
                copyExpression }}>
            <div id="canvas">
                <Calculator copiedExpression = {copiedExpression}/>
                <History />
            </div>
        </ExpressionsContext.Provider>
        </div>
    )
}

export default App