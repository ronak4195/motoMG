import express from 'express';
import productController from '../controllers/product.controller.js';
import usersController from '../controllers/users.controllers.js';
const router = express.Router();

router.post('/', productController.firstPage);

//Create
router.post('/addproduct', productController.createProduct);

//Read all products
router.get('/allproducts', productController.getAllProducts);

//Read by ID
router.get('/products/:id', productController.getProductById);

//Update by ID
router.put('/products/:id', productController.updateProduct);

//Delete by ID
router.post('/removeproduct', productController.deleteProduct);


router.get('/cart', usersController.cart);

//Create
router.post('/signup', usersController.signup);

//Read all products
router.post('/login', usersController.login);

//Read by ID
router.put('/update-cart', usersController.updateCart);

router.get('/allproducts/category/:category', productController.getProductsByCategory);   //remove use allproducts?category

router.get('/:name', productController.getProductsByCategory);    //remove use allproducts?category

export default router;
