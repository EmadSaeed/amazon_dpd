module.exports = app => {
    const deliveryNote = require("../controllers/deliveryNote.controller.js");

    // Retrieve all deliveryNote
    app.get("/deliveryNote/:id", deliveryNote.findOneDeliveryNote);

    // Update a deliveryNote with deliveryNote
    app.put("/deliveryNote/:id", deliveryNote.updateDeliveryNote);

  };