const Box = require("../models/box.model.js");

exports.getBox = (req, res) => {
  const { PurchaseOrderId } = req.query;
    Box.getBox(PurchaseOrderId, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving addresses."
        });
      else res.send(data);
    });
  };
