const Shipment = require("../models/shipment.model.js");

exports.getShipments = (req, res) => {
    Shipment.getShipments((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving addresses."
        });
      else res.send(data);
    });
  };
