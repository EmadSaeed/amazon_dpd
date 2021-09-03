const sql = require("./db.js");

// constructor
const Product = function(product) {
  this.fotlSKU = product.fotlSKU;
  this.EAN = product.EAN;
  this.size = product.size;
  this.packOf = product.packOf;
  this.unitWeight = product.unitWeight;
  this.packWeight = product.packWeight;
  this.fabric = product.fabric;
  this.harmonisedCode = product.harmonisedCode;
  this.coo = product.coo;
  this.unitValue = product.unitValue;
  this.notes = product.notes;
};

Product.findByEANs = (EAN, result) => {
  console.log(EAN);

  sql.query(`SELECT * FROM products WHERE EAN IN (${EAN})` , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res);
      result(null, res);
      return;
    }

    // not found product with the EAN
    result({ kind: "not_found" }, null);
  });
};


module.exports = Product;
