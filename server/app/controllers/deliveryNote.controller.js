const DeliveryNote = require("../models/deliveryNote.model.js");

// Find a single deliveryNote with a id
exports.findOneDeliveryNote = async (req, res) => {
  await DeliveryNote.findOneDeliveryNote(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found deliveryNote with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving deliveryNote with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a deliveryNote identified by the id in the request
exports.updateDeliveryNote = async (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
   await DeliveryNote.updateDeliveryNoteById(
      req.params.id,
      new DeliveryNote(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found deliveryNote with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating deliveryNote with id " + req.params.id
            });
          }
        } else {
          res.send(data)
        };
      }
    );
  };