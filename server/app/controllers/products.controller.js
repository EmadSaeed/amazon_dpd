const Product = require("../models/product.model.js");

exports.findProductsByEAN = async (req, res) => {
    const { EAN } = req.query;
      Product.findByEANs(EAN,(err, data) => {
        if (err){
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving products."
          });
        } else {
          res.send(data)
        };
      });
    };
