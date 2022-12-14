import pool from '../db.js'


export const getAllTickets = async (req, res) => {
    try {
        const response = await pool.execute('select * from vales')
        res.status(200).json(response[0])
    } catch (error) {
        res.status(404).json({ message: message.error })
    }
}

export const addTicket = async (req, res) => {
    try {
        const { folio, tipoVale, descripcion, observacion, entrego, recibio, fecha } = req.body[0]

        for (let index = 0; index < req.body[1].length; index++) {
            pool.execute('insert into vales (folio, tipoVale, descripcion, observacion, entrego, recibio, fecha, codigoInsumo, cantidad) values (?,?,?,?,?,?,?,?,?)',
                [folio, tipoVale, descripcion, observacion, entrego, recibio, fecha, req.body[1][index].insumo, req.body[1][index].cantidad])

        }

        res.status(200).json(req.body)
    } catch (error) {
        res.status(404).json({ message: message.error })
    }
}

export const editTicket = async (req, res) => {
    try {
        res.status(200).json
    } catch (error) {
        res.status(404).json({ message: message.error })
    }
}

export const deleteTicket = async (req, res) => {
    try {
        res.status(200).json
    } catch (error) {
        res.status(404).json({ message: message.error })
    }
}