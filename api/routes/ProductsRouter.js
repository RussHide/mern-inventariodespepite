import express from 'express'
import {getAllProducts, deleteProduct, addProduct, editProduct, getAllProductsNames} from '../controllers/ProductsController.js'

const router = express.Router()

router.get('/', getAllProducts)
router.get('/nombres', getAllProductsNames)
router.post('/', addProduct)
router.patch('/:idEdit', editProduct)
router.delete('/:idDelete', deleteProduct)

export default router