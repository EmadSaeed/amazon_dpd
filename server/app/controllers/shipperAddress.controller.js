const ShipperAddress = require("../models/shipperAddress.model.js");

// Find a single shipperAddress with a id
exports.findOneShipperAddress = async (req, res) => {
  await ShipperAddress.findOneShipperAddress(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found shipperAddress with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving shipperAddress with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a shipperAddress identified by the id in the request
exports.updateShipperAddress = async (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
   await ShipperAddress.updateShipperAddressById(
      req.params.id,
      new ShipperAddress(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found shipperAddress with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating shipperAddress with id " + req.params.id
            });
          }
        } else {
          res.send(data)
        };
      }
    );
  };