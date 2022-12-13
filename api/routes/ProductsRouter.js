import express from 'express'
import {getAllProducts, deleteProduct, addProduct, editProduct} from '../controllers/ProductsController.js'

const router = express.Router()

router.get('/', getAllProducts)
router.post('/', addProduct)
router.patch('/:idEdit', editProduct)
router.delete('/:idDelete', deleteProduct)

export default router