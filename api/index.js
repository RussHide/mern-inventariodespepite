import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import pool from './db.js'
import ProductsRouter from './routes/ProductsRouter.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use('/insumos', ProductsRouter)

app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
})