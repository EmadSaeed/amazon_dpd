const sql = require("./db.js");

//constructor
const Box = function(box){
    this.EAN = box.EAN;
    this.BoxNo = box.BoxNo;
    this.Name = box.Name;
    this.Title = box.Title;
    this.Color = box.Color;
    this.Size = box.Size;
    this.Count = box.Count;
}

Box.getBox = (PurchaseOrderId,result) => {
    sql.query(`SELECT * FROM box WHERE PurchaseOrderId = ${PurchaseOrderId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("box: ", res);
      result(null, res);
    });
  };

module.exports = Box;