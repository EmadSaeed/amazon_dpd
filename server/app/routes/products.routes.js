module.exports = app => {
    const products = require("../controllers/products.controller");
  
    app.get("/products", products.findProductsByEAN);
  
  };