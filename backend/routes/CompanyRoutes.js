const router = require("express").Router();

const CompanyController = require("../controllers/CompanyController");

const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

router.post("/register", verifyToken, CompanyController.register);
router.get('/', CompanyController.getAll);
router.get('/:id', verifyToken, CompanyController.getCompanyById);
router.get('/myCompany', CompanyController.getUserCompany)
router.delete('/:id', CompanyController.removeCompanyById);
router.patch('/:id', imageUpload.single("image"), CompanyController.updateCompany);

module.exports = router;