import mongoose from "mongoose"
import asyncWrapper from "../helpers/async-wrapper.js"
import Expression from "../models/Expression.js"
import { createCustomError } from '../error/custom-error.js'

// get all records
export const getAllExpressions = asyncWrapper(async (req,res,next) => {
    const expressions = await Expression.find({})
    res.status(200).json({expressions}) 
})

export const createExpression = asyncWrapper(async (req,res,next) => {
    const newRecord = new Expression({expression:req.body})
    //console.log(newRecord);
    Expression.create(newRecord)
    res.status(201).json({status:"SUCCESS"}) 
})

export const getExpression = asyncWrapper(async (req,res,next) => {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {return res.status(404).send(`ID ${id} is not valid`)}
    let expression = await Expression.findById(id)

    if(!expression) {
        return next(createCustomError(`no expression with id ${id}`, 404))
    }

    res.status(201).json(expression) 
})

export const updateExpression = asyncWrapper(async (req,res,next) => {
    //console.log(req.body, req.params.id);
    const newExpression = req.body;
    const id = req.params.id
    Expression.findByIdAndUpdate(id, newExpression, (err, expression)=>{
        if (err) {
            return next(createCustomError(`Update of the expression with id ${id} failed with the error ${err}`,404))
        } else {
            res.status(201).json({status: "SUCCESS"})
        }
    }) 
})

export const deleteExpression = asyncWrapper(async (req,res,next) => {
    
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {return res.status(404).send(`ID ${id} is not valid`)}
    const resultExpression = await Expression.findByIdAndDelete(id)

    if(!resultExpression) {
        return next(createCustomError(`no expression with id ${id}`, 404))
    }

    res.status(201).json({status:"SUCCESS"})
})
