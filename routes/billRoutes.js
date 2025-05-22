const express = require("express");
const { authentication, isAdmin } = require("../middlewares/authentication");
const { generateBill, getAllBills, searchBill } = require("../controllers/bill");
const router = express.Router();



router.post("/", authentication, isAdmin, generateBill);
router.get("/", authentication, isAdmin, getAllBills);
router.get("/search/:id", authentication, isAdmin, searchBill);


module.exports = router; 