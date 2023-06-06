const router = require("express").Router();


const CompanyController = require("../controllers/CompanyController");

router.post("/register", CompanyController.register);
router.get('/', CompanyController.getAll);
router.get('/:id', CompanyController.getCompanyById);
router.delete('/:id', CompanyController.removeCompanyById);
router.patch('/:id', CompanyController.updateCompany);

module.exports = router;