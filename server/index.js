import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
import router from './routes/expressions.js'
import notFound from './middleware/not-found.js'
import errorHandlerMiddleWare from './middleware/error-handler.js'
import cors from 'cors'


const app = express()
dotenv.config()
const port = process.env.PORT || 5000;

// middleware

app.use(express.json())
app.use(cors())
app.use(express.static('../client/build'))

// routes
app.use('/api/v1/expressions', router)
app.use(notFound)
app.use(errorHandlerMiddleWare)

// database connect & server listener
const start = async () => {
    try {
        const connectionString = process.env.DB_URI || "mongodb://mongo:27017/calculator_app"
        await connectDB(connectionString)
        app.listen(port, () => {console.log(`Server is listening on port ${port}...`);})
    } catch (error) {
        console.log(error);
    }
}
start()