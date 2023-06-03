const router = require("express").Router();


const ProviderController = require("../controllers/ProviderController");

router.post("/register", ProviderController.register);
router.get('/', ProviderController.getAll);
router.get('/:id', ProviderController.getProviderById);
router.delete('/:id', ProviderController.removeProviderById);
router.patch('/:id', ProviderController.updateProvider);

module.exports = router;