const router = require("express").Router();


const ProviderController = require("../controllers/ProviderController");

router.post("/register", ProviderController.register);

module.exports = router;