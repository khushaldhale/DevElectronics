const express = require("express");
const { authentication, isAdmin } = require("../middlewares/authentication");
const { createItem, getAllItems, deleteItem, updateItem, getItem, searchItem } = require("../controllers/items");
const router = express.Router();



router.post("/", authentication, isAdmin, createItem);
router.get("/", getAllItems);
router.get("/:id", getItem);
router.delete("/:id", authentication, isAdmin, deleteItem);
router.put("/:id", authentication, isAdmin, updateItem);
router.post("/search", searchItem);


module.exports = router;
