const sql = require("./db.js");

// constructor
const Address = function(address) {
  this.addressType  = address.addressType;
  this.selectedAddress  = address.selectedAddress;
  this.shortName = address.shortName;
  this.organisationName = address.organisationName;
  this.addressLine1 = address.addressLine1;
  this.addressLine2 = address.addressLine2;
  this.city = address.city;
  this.county = address.county;
  this.postcode = address.postcode;
  this.countryCode = address.countryCode;
  this.additionalInformation = address.additionalInformation;
  this.contactName = address.contactName;
  this.contactTelephoneNumber = address.contactTelephoneNumber;
  this.emailAddress = address.emailAddress;
  this.notificationSMSNumber = address.notificationSMSNumber;
  this.user = address.user;
};

Address.create = (newAddress, result) => {
  sql.query("INSERT INTO addressBook SET ?", newAddress, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created address: ", { id: res.insertId, ...newAddress });
    result(null, { id: res.insertId, ...newAddress });
  });
};

Address.findById = (addressId, result) => {
  sql.query(`SELECT * FROM addressBook WHERE id = ${addressId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found address: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Address with the id
    result({ kind: "not_found" }, null);
  });
};

Address.getAll = (type ,result) => {
  sql.query(`SELECT * FROM addressBook WHERE addressType = ${type}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("addressBook: ", res);
    result(null, res);
  });
};

Address.updateById = (id, address, result) => {
  sql.query(
      "UPDATE addressBook SET addressType = ?, selectedAddress = ?, shortName = ?, organisationName = ?, addressLine1 = ?, addressLine2 = ?, city = ?, county = ?, postcode = ?, countryCode = ?, additionalInformation = ?, contactName = ?, contactTelephoneNumber = ?, emailAddress = ?, notificationSMSNumber = ?, user = ? WHERE id = ?",
      [address.addressType,
      address.selectedAddress,
      address.shortName,
      address.organisationName,
      address.addressLine1,
      address.addressLine2,
      address.city,
      address.county,
      address.postcode,
      address.countryCode,
      address.additionalInformation,
      address.contactName,
      address.contactTelephoneNumber,
      address.emailAddress,
      address.notificationSMSNumber,
      address.user,
      id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Address with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated address: ", { id: id, ...address });
      result(null, { id: id, ...address });
    }
  );
};

Address.remove = (id, result) => {
  sql.query("DELETE FROM addressBook WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Address with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted address with id: ", id);
    result(null, res);
  });
};

Address.removeAll = result => {
  sql.query("DELETE FROM addressBook", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} addressBook`);
    result(null, res);
  });
};

Address.setAllSelectedToFalse = (type, result) => {
  sql.query(`UPDATE addressBook SET selectedAddress = 0 WHERE addressType = ${type}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`all ${res.affectedRows} set to false`);
    result(null, res);
  });
}


Address.getSelectedFulfilmentAddress = (result) => {
  sql.query(`SELECT * FROM addressBook WHERE selectedAddress = 1 AND addressType = 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("addressBook: ", res);
    result(null, res);
  });
};


Address.getSelectedInvoiceAddress = (result) => {
  sql.query(`SELECT * FROM addressBook WHERE selectedAddress = 1 AND addressType = 2`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("addressBook: ", res);
    result(null, res);
  });
};



module.exports = Address;
