const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')

// dla funkcji z productsController np. find, create itd.

router.get('/', productsController.home)
router.get('/products/', productsController.products)//ograniczony do 12
router.get('/allProducts/', productsController.allProducts)//nieograniczony
router.post('/products/', productsController.find)//wyszukiwanie produktu wszystkie produkty które zawierają słowo mleko
router.get('/product/:id', productsController.singleProduct)// pobieranie konkretnego produktu o danym id
router.get('/categories/', productsController.categories)//pobranie wszystkich kategorii w bazie
router.get('/category/:category', productsController.category)// po kliknięciu kategorii z danym id wyświetlą nam sie produkty z tej kategorii

module.exports = router