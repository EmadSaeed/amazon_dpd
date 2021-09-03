const sql = require("./db.js");

//constructor
const Shipment = function(shipment){
    this.PurchaseOrderId = shipment.PurchaseOrderId;
    this.PurchaseOrder = shipment.PurchaseOrder;
    this.TotalBoxes = shipment.TotalBoxes;
    this.TotalBoxesCompleted = shipment.TotalBoxesCompleted;
    this.TotalBoxesInProcess = shipment.TotalBoxesInProcess;
    this.TotalBoxesShipped = shipment.TotalBoxesShipped;
    this.DateCreated = shipment.DateCreated;
}

Shipment.getShipments = (result) => {
    sql.query(`SELECT * FROM shipments`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("shipments: ", res);
      result(null, res);
    });
  };

module.exports = Shipment;