const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//FUNCION BUSCO PRODUCTO POR id DENTRO DE ARRAY "products"
function productoById(id, productosArray) {
  return productosArray.find((p) => p.id == id);
}

const controller = {
  // Root - Show all products
  index: (req, res) => {
    res.render("products");
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    let producto = productoById(req.params.id, products);
    res.render("detail", { producto, toThousand });
  },

  // Create - Form to create
  create: (req, res) => {
    res.render("product-create-form");
  },

  // Create -  Method to store
  store: (req, res) => {
    let idNuevo = products.length + 1;
    let nuevoProducto = {
      id: idNuevo,
      ...req.body,
      image: req.file.originalname,
    };

    console.log(req.body);

    products.push(nuevoProducto);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
    res.redirect("/");
  },

  // Update - Form to edit
  edit: (req, res) => {
    let productToEdit = productoById(req.params.id, products);
    res.render("product-edit-form", { productToEdit });
  },
  // Update - Method to update
  update: (req, res) => {
    //CREO NUEVO ARRAY CON EL PRODUCTO MODIFICADO SEGUN Id
    let nuevaListaProductos = products.map((p) => {
      if (p.id == req.params.id) {
        p.name = req.body.name;
        p.price = req.body.price;
        p.discount = req.body.discount;
        p.category = req.body.category;
        p.description = req.body.description;
        return p;
      } else {
        return p;
      }
    });

    //ESCRIBO ARCHIVO JSON
    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(nuevaListaProductos, null, " ")
    );
    res.redirect("/");
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    let id = req.params.id;
    //FILTRO ARRAY POR TODOS LOS PRODUCTOS DISTINTOS DEL Id
    let listaProductosDelete = products.filter((p) => p.id != id);

    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(listaProductosDelete, null, " ")
    );
    res.redirect("/");
  },
};

module.exports = controller;
