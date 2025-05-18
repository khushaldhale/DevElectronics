const express = require("express");
const { authentication, isAdmin } = require("../middlewares/authentication");
const { createCompany, getAllCompanies, deleteCompany } = require("../controllers/company");
const router = express.Router();

router.post("/", authentication, isAdmin, createCompany);
router.get("/:catId", authentication, getAllCompanies);
router.delete("/:id", authentication, isAdmin, deleteCompany);


module.exports = router;


