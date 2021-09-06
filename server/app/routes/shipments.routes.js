module.exports = app => {
    const shipment = require("../controllers/shipment.controller");
  
    app.get("/shipments", shipment.getShipments);
  
  };