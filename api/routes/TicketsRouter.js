import express from 'express'
import { getAllTickets, addTicket, editTicket, deleteTicket } from '../controllers/TicketsController.js'
import pool from '../db.js'

const router = express.Router()

router.get('/', getAllTickets)
router.post('/', addTicket)
router.patch('/:idEdit', editTicket)
router.delete('/:idDelete', deleteTicket)
router.delete('/', async (req, res) => {
    try {

        await pool.execute(`delete from vales`)
        res.status(200).json()
    } catch (error) {
        await poolCon.rollback()
        res.status(404).json({ message: error.message })
    }
})


export default router