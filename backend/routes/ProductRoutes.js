const router = require("express").Router();


const ProductController = require("../controllers/ProductController");

router.post("/register", ProductController.register);
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getProductById);
router.delete('/:id', ProductController.removeProductById);
router.patch('/:id', ProductController.updateProduct);

module.exports = router;