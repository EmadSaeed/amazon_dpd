const sql = require("./db.js");

// constructor
const DeliveryNote = function(deliveryNote) {
  this.deliveryCustomsValue = deliveryNote.deliveryCustomsValue;
  this.deliveryDescription = deliveryNote.deliveryDescription;
  this.deliveryNoOfPackages = deliveryNote.deliveryNoOfPackages;
  this.deliveryTotalWeight = deliveryNote.deliveryTotalWeight;
  this.deliveryCustomerRef1 = deliveryNote.deliveryCustomerRef1;
  this.deliveryCustomerRef2 = deliveryNote.deliveryCustomerRef2;
  this.deliveryCustomerRef3 = deliveryNote.deliveryCustomerRef3;
  this.invoiceType = deliveryNote.invoiceType;
  this.reasonForExport = deliveryNote.reasonForExport;
  this.receiverEORINo = deliveryNote.receiverEORINo;
  this.receiverVAT = deliveryNote.receiverVAT;
  this.shipperIOSS = deliveryNote.shipperIOSS;
  this.shipperEORINo = deliveryNote.shipperEORINo;
  this.termsOfDelivery = deliveryNote.termsOfDelivery;
  this.generateCustomsData = deliveryNote.generateCustomsData;
  this.deliveryServiceCode = deliveryNote.deliveryServiceCode;
  this.extendedLiabilityFlag = deliveryNote.extendedLiabilityFlag;
  this.user = deliveryNote.user;
};


DeliveryNote.findOneDeliveryNote = (id, result) => {
  sql.query(`SELECT * FROM deliveryNote WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found deliveryNote: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found deliveryNote with the id
    result({ kind: "not_found" }, null);
  });
};


DeliveryNote.updateDeliveryNoteById = (id, deliveryNote, result) => {
    sql.query(
        "UPDATE deliveryNote SET deliveryCustomsValue = ?, deliveryDescription = ?, deliveryNoOfPackages = ?, deliveryTotalWeight = ?, deliveryCustomerRef1 = ?, deliveryCustomerRef2 = ?, deliveryCustomerRef3 = ?, invoiceType= ?, reasonForExport = ?, receiverEORINo = ?, receiverVAT = ?, shipperIOSS = ?, shipperEORINo = ?, termsOfDelivery = ?, generateCustomsData = ?, deliveryServiceCode = ?, extendedLiabilityFlag = ?, user = ? WHERE id = ?",
        [deliveryNote.deliveryCustomsValue,
        deliveryNote.deliveryDescription,
        deliveryNote.deliveryNoOfPackages,
        deliveryNote.deliveryTotalWeight,
        deliveryNote.deliveryCustomerRef1,
        deliveryNote.deliveryCustomerRef2,
        deliveryNote.deliveryCustomerRef3,
        deliveryNote.invoiceType,
        deliveryNote.reasonForExport,
        deliveryNote.receiverEORINo,
        deliveryNote.receiverVAT,
        deliveryNote.shipperIOSS,
        deliveryNote.shipperEORINo,
        deliveryNote.termsOfDelivery,
        deliveryNote.generateCustomsData,
        deliveryNote.deliveryServiceCode,
        deliveryNote.extendedLiabilityFlag,
        deliveryNote.user,
        id],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    
          if (res.affectedRows == 0) {
            // not found deliveryNote with the id
            result({ kind: "not_found" }, null);
            return;
          }
    
          console.log("updated deliveryNote: ", { id: id, ...deliveryNote });
          result(null, { id: id, ...deliveryNote });
        }
    );
  };


module.exports = DeliveryNote;
