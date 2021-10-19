// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const productsController = require("../controllers/productsController");

/*** GET ALL PRODUCTS ***/
router.get("/", productsController.index); //LISTO

/*** CREATE ONE PRODUCT ***/
router.get("/create/", productsController.create); //LISTO
router.post("/create/", productsController.store); //LISTO

/*** GET ONE PRODUCT ***/
router.get("/detail/:id", productsController.detail); //LISTO

/*** EDIT ONE PRODUCT ***/
router.patch("/edit/:id", productsController.update); //LISTO
router.get("/edit/:id", productsController.edit); //LISTO

/*** DELETE ONE PRODUCT***/
router.delete("/delete/:id", productsController.destroy); //LISTO

module.exports = router;
