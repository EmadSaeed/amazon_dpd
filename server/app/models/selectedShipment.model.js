const sql = require("./db.js");

// constructor
const SelectedShipment = function(selectedShipment) {
  this.EAN  = selectedShipment.EAN;
  this.fabric  = selectedShipment.fabric;
  this.harmonisedCode  = selectedShipment.harmonisedCode;
  this.unitWeight  = selectedShipment.unitWeight;
  this.parcel = selectedShipment.parcel;
  this.description = selectedShipment.description;
  this.productType = selectedShipment.productType;
  this.itemOrigin  = selectedShipment.itemOrigin;
  this.quantity = selectedShipment.quantity;
  this.unitValue = selectedShipment.unitValue;
};

SelectedShipment.create = (newSelectedShipment, result) => {
  sql.query("INSERT INTO selectedShipment SET ?", newSelectedShipment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created selectedShipment: ", { id: res.insertId, ...newSelectedShipment });
    result(null, { id: res.insertId, ...newSelectedShipment });
  });
};

SelectedShipment.getAllSelectedShipments = (result) => {
  sql.query(`SELECT * FROM selectedShipment ORDER BY parcel ASC`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("selectedShipment: ", res);
    result(null, res);
  });
};

SelectedShipment.updateByEAN = (EAN, selectedShipment, result) => {
  sql.query(
      "UPDATE selectedShipment SET fabric = ?, harmonisedCode = ?, unitWeight = ?, itemOrigin = ?, unitValue = ? WHERE EAN = ?",
      [
        selectedShipment.fabric,
        selectedShipment.harmonisedCode,
        selectedShipment.unitWeight,
        selectedShipment.itemOrigin,
        selectedShipment.unitValue,
        EAN
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found SelectedShipment with the EAN
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated selectedShipment: ", { EAN: EAN, ...selectedShipment });
      result(null, { EAN: EAN, ...selectedShipment });
    }
  );
};


// Truncat selectedShipment
SelectedShipment.truncate = result => {
  sql.query("TRUNCATE selectedShipment", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`selectedShipment been truncated`);
    result(null, res);
  });
};


module.exports = SelectedShipment;
