import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import pool from './db.js'
import ProductsRouter from './routes/ProductsRouter.js'
import TicketsRouter from './routes/TicketsRouter.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/insumos', ProductsRouter)
app.use('/vales', TicketsRouter)

app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
})