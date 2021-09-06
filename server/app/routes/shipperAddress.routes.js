module.exports = app => {
    const shipperAddress = require("../controllers/shipperAddress.controller.js");

    // Retrieve all shipperAddress
    app.get("/shipperAddress/:id", shipperAddress.findOneShipperAddress);

    // Update a shipperAddress with shipperAddress
    app.put("/shipperAddress/:id", shipperAddress.updateShipperAddress);

  };