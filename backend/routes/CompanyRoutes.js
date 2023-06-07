const router = require("express").Router();

const CompanyController = require("../controllers/CompanyController");

const { imageUpload } = require("../helpers/image-upload");

router.post("/register", CompanyController.register);
router.get('/', CompanyController.getAll);
router.get('/:id', CompanyController.getCompanyById);
router.delete('/:id', CompanyController.removeCompanyById);
router.patch('/:id', imageUpload.single("image"), CompanyController.updateCompany);

module.exports = router;