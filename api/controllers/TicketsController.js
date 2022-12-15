import pool from '../db.js'


export const getAllTickets = async (req, res) => {
    try {
        const response = await pool.execute('select * from vales')
        res.status(200).json(response[0])
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const addTicket = async (req, res) => {
    try {

        /*
        Example
        [{folio: 123, tipoVale: 'Salida', other keys and values }, [{insumo: 'Rescate', cantidad: 5}, {insumo: 'Malation', cantidad: 2}]]
        result in db should be
        folio = 123, tipoVale = Salida, Insumo = Rescate, Cantidad = 5
        folio = 123, tipoVale = Salida, Insumo = Malation, Cantidad = 2
        */
        const { folio, tipoVale, descripcion, observacion, entrego, recibio, fecha } = req.body[0]
        for (let index = 0; index < req.body[1].length; index++) {
            await pool.execute('insert into vales (folio, tipoVale, descripcion, observacion, entrego, recibio, fecha, codigoInsumo, cantidad) values (?,?,?,?,?,?,?,?,?)',
                [folio, tipoVale, descripcion, observacion, entrego, recibio, fecha, req.body[1][index].insumo, req.body[1][index].cantidad])
            if (tipoVale === 'Entrada') {
                await pool.execute(`update productos set cantidad = cantidad + ${req.body[1][index].cantidad} where nombre = '${req.body[1][index].insumo}'`)
            } else {
                await pool.execute(`update productos set cantidad = cantidad - ${req.body[1][index].cantidad} where nombre = '${req.body[1][index].insumo}'`)
            }
        }

        res.status(200).json()
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const editTicket = async (req, res) => {
    try {
        res.status(200).json
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteTicket = async (req, res) => {
    const { idDelete } = req.params
    try {
        const ticket =  await pool.query('select * from vales where idVale =' + idDelete)
       const x = await pool.query('delete from vales where idProducto =' + idDelete)
        res.status(200).json(x)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}