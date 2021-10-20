// ************ Require's ************
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// ************ Controller Require ************
const productsController = require("../controllers/productsController");

// ************ Multer Config ************
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../proyecto/public/images/products");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

/*** GET ALL PRODUCTS ***/
router.get("/", productsController.index); //LISTO

/*** CREATE ONE PRODUCT ***/
router.get("/create/", productsController.create); //LISTO
router.post("/create/", upload.single("image"), productsController.store); //LISTO

/*** GET ONE PRODUCT ***/
router.get("/detail/:id", productsController.detail); //LISTO

/*** EDIT ONE PRODUCT ***/
router.patch("/edit/:id", productsController.update); //LISTO
router.get("/edit/:id", productsController.edit); //LISTO

/*** DELETE ONE PRODUCT***/
router.delete("/delete/:id", productsController.destroy); //LISTO

module.exports = router;
