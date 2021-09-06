module.exports = app => {
    const selectedShipment = require("../controllers/selectedShipment.controller");

    app.post("/selectedShipments", selectedShipment.createSelectedShipment);
    
    app.get("/selectedShipments", selectedShipment.findAllSelectedShipments);
    
    // Update selectedShipments with EAN
    app.put("/selectedShipments/:EAN", selectedShipment.updateSelectedShipment);
    
    // Truncate selectedShipments
    app.patch("/selectedShipments/truncate", selectedShipment.truncateSelectedShipment);
  };