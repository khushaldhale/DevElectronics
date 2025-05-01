const express = require("express");
const { authentication, isAdmin } = require("../middlewares/authentication");
const { createItem, getAllItems, deleteItem, updateItem } = require("../controllers/items");
const router = express.Router();



router.post("/", authentication, isAdmin, createItem);
router.get("/", getAllItems);
router.delete("/:id", authentication, isAdmin, deleteItem);
router.put("/:id", authentication, isAdmin, updateItem);

module.exports = router;
