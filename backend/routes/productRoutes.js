import express from 'express'
const router = express.Router()
import {
  getProducts,
  getPrpductById
} from '../controllers/productControllers.js'

router.route('/').get(getProducts)

router.route('/:id').get(getPrpductById)

export default router