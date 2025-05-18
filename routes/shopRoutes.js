const express = require("express");
const { authentication, isAdmin } = require("../middlewares/authentication");
const { createShop, getShop } = require("../controllers/shop");
const router = express.Router();


router.post("/", authentication, isAdmin, createShop);
router.get("/", authentication, isAdmin, getShop)


module.exports = router