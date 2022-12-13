import pool from '../db.js'

export const getAllProducts = async (req, res) => {
    try {
        const response = await pool.execute('select * from productos')
        /* const orderByQuantity = response[0].sort((a, b) => a.cantidad - b.cantidad ) */
        res.status(200).json(response[0])
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const addProduct = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.body.codigo, req.body.nombre, req.body.categoria, req.body.cantidad, req.body.unidad)
        const newProductData = [req.body.codigo, req.body.nombre, req.body.categoria, req.body.cantidad, req.body.unidad]
        await pool.execute('insert into productos (codigo, nombre, categoria, cantidad, unidad) values (?,?,?,?,?)', newProductData)
        res.status(200).json({ message: 'Product created' })
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    }
}

export const editProduct = async (req, res) => {
    try {
        const { idEdit } = req.params
        const editProductData = [req.body.codigo, req.body.nombre, req.body.descripcion, req.body.cantidad, req.body.unidad, idEdit]
        await pool.execute('update productos set codigo = ?, nombre = ?, descripcion = ?, cantidad = ?, unidad = ? where idProducto = ?', editProductData)
        res.status(200).json({ message: 'Product edited' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteProduct = async(req, res) => {
    try {
        const { idDelete } = req.params
        const response = await pool.execute('delete from productos where idProducto = ' + idDelete)
        res.status(200).json({ message: 'Product deleted' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}