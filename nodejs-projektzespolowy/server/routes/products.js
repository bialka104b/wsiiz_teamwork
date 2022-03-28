const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')

// dla funkcji z productsController np. find, create itd.

router.get('/', productsController.home)
router.post('/', productsController.find)
router.get('/products/', productsController.products)
router.get('/product/:id', productsController.singleProduct)
router.get('/categories/', productsController.categories)
router.get('/category/:category', productsController.category)

module.exports = router