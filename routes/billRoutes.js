const express = require("express");
const { authentication, isAdmin } = require("../middlewares/authentication");
const { generateBill, getAllBills } = require("../controllers/bill");
const router = express.Router();



router.post("/", authentication, isAdmin, generateBill);
router.get("/", authentication, isAdmin, getAllBills)

module.exports = router; 