import express from 'express'

import  {
    createExpression,
    getExpression,
    getAllExpressions,
    updateExpression,
    deleteExpression } from '../controllers/expressions.js'

const router = express.Router()

router.route('/')
    .get(getAllExpressions)
    .post(createExpression)

    router.route('/:id')
    .get(getExpression)
    .patch(updateExpression)
    .delete(deleteExpression)

export default router