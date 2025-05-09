const express = require("express");
const { authentication, isAdmin } = require("../middlewares/authentication");
const { createCategory, getAllCategories, getParticularCategory, deleteCategory } = require("../controllers/category");
const router = express.Router();


router.post("/", authentication, isAdmin, createCategory);
router.get("/", getAllCategories);
router.get("/:id", getParticularCategory);
router.delete("/:id", authentication, isAdmin, deleteCategory);

module.exports = router;