const SelectedShipment = require("../models/selectedShipment.model.js");

exports.createSelectedShipment = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create SelectedShipment
  const selectedShipment = new SelectedShipment({
    EAN: req.body.EAN,
    description: req.body.description,
    productType: req.body.productType,
    parcel: req.body.parcel,
    quantity: req.body.quantity
  });

  // Save SelectedShipment in the database
  await SelectedShipment.create(selectedShipment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the SelectedShipment."
      });
    else res.send(data);
  });
};


exports.findAllSelectedShipments = async (req, res) => {
  await SelectedShipment.getAllSelectedShipments((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SelectedShipments."
      });
    } else {
      res.send(data)
    };
  });
}

exports.truncateSelectedShipment = async (req, res) => {
  await SelectedShipment.truncate((err) => {
    if (err) {
      res.status(500).send({
        message: "could not truncate Selected Shipment"
      });
    } else res.send({ message: `Selected Shipment was truncated successfully!` });
  });
}


// Update SelectedShipment identified by EAN in the request
exports.updateSelectedShipment = async (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  await SelectedShipment.updateByEAN(
    req.params.EAN,
    new SelectedShipment(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found EAN: ${req.params.EAN}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating EAN: " + req.params.EAN
          });
        }
      } else res.send(data);
    }
  );
};