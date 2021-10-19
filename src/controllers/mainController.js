const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//PODUCTOS EN OFERTA
const productosEnOferta = products.filter((p) => p.category == "in-sale");

//PRODUCTOS VISITADOS

const productosVisitados = products.filter((p) => p.category == "visited");

const controller = {
  index: (req, res) => {
    res.render("index", { productosEnOferta, productosVisitados, toThousand });
  },
  search: (req, res) => {
    // Do the magic
    res.send(products);
  },
};

module.exports = controller;
