const sql = require("./db.js");

// constructor
const ShipperAddress = function(shipperAddress) {
  this.shipperOrganisationName = shipperAddress.shipperOrganisationName;
  this.shipperAddressLine1 = shipperAddress.shipperAddressLine1;
  this.shipperAddressLine2 = shipperAddress.shipperAddressLine2;
  this.shipperAddressCity = shipperAddress.shipperAddressCity;
  this.shipperAddressCounty = shipperAddress.shipperAddressCounty;
  this.shipperPostcode = shipperAddress.shipperPostcode;
  this.shipperCountryCode = shipperAddress.shipperCountryCode;
  this.shipperContactName = shipperAddress.shipperContactName;
  this.shipperContactTelephoneNo = shipperAddress.shipperContactTelephoneNo;
  this.user = shipperAddress.user;
};


ShipperAddress.findOneShipperAddress = (id, result) => {
  sql.query(`SELECT * FROM shipperAddress WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found shipperAddress: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found shipperAddress with the id
    result({ kind: "not_found" }, null);
  });
};


ShipperAddress.updateShipperAddressById = (id, shipperAddress, result) => {
    sql.query(
        "UPDATE shipperAddress SET shipperOrganisationName = ?, shipperAddressLine1 = ?, shipperAddressLine2 = ?, shipperAddressCity = ?, shipperAddressCounty = ?, shipperPostcode = ?, shipperCountryCode = ?, shipperContactName = ?, shipperContactTelephoneNo = ?, user = ? WHERE id = ?",
        [shipperAddress.shipperOrganisationName,
        shipperAddress.shipperAddressLine1,
        shipperAddress.shipperAddressLine2,
        shipperAddress.shipperAddressCity,
        shipperAddress.shipperAddressCounty,
        shipperAddress.shipperPostcode,
        shipperAddress.shipperCountryCode,
        shipperAddress.shipperContactName,
        shipperAddress.shipperContactTelephoneNo,
        shipperAddress.user,
        id],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    
          if (res.affectedRows == 0) {
            // not found shipperAddress with the id
            result({ kind: "not_found" }, null);
            return;
          }
    
          console.log("updated shipperAddress: ", { id: id, ...shipperAddress });
          result(null, { id: id, ...shipperAddress });
        }
    );
  };


module.exports = ShipperAddress;
