const express = require('express');
const router = express.Router();

const { authenticateUser, authorizePermission } = require('../middleware/authentication');

const { createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage } = require('../controllers/ProductController');

const { getSingleProductReview } = require('../controllers/reviewController')

router
    .route('/')
    .post([authenticateUser, authorizePermission('admin')], createProduct)
    .get(getAllProducts);

// ahead of :id because /uploads may be considered as id
router.route('/uploadImage')
    .post([authenticateUser, authorizePermission('admin')], uploadImage)

router.route('/:id')
    .get(getSingleProduct)
    .patch([authenticateUser, authorizePermission('admin')], updateProduct)
    .delete([authenticateUser, authorizePermission('admin')], deleteProduct)

router.route('/:id/reviews').get(getSingleProductReview);

module.exports = router;
