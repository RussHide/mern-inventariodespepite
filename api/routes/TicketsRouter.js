import express from 'express'
import {getAllTickets, addTicket, editTicket, deleteTicket} from '../controllers/TicketsController.js'

const router = express.Router()

router.get('/', getAllTickets)
router.post('/', addTicket)
router.patch('/:idEdit', editTicket)
router.delete('/:idDelete', deleteTicket)

export default router