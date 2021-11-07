import mongoose from 'mongoose'

const ExpressionSchema = new mongoose.Schema({
    expression: {
        type: [Object],
        required: [true, 'Expression cannot be empty']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String,
        default: 'user'
    },
    usesCount: {
        type: Number,
        default: 0
    }
})

export default mongoose.model('Expression', ExpressionSchema)