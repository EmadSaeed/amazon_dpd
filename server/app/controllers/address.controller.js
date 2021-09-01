const Address = require("../models/address.model.js");

// Create and Save a new Address
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Address
    const address = new Address({
      addressType : req.body.addressType,
      selectedAddress : req.body.selectedAddress,
      shortName: req.body.shortName,
      organisationName: req.body.organisationName,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      county: req.body.county,
      postcode: req.body.postcode,
      countryCode: req.body.countryCode,
      additionalInformation: req.body.additionalInformation,
      contactName: req.body.contactName,
      contactTelephoneNumber: req.body.contactTelephoneNumber,
      additionalInformation: req.body.additionalInformation,
      emailAddress: req.body.emailAddress,
      notificationSMSNumber: req.body.notificationSMSNumber,
      user: req.body.user,
    });

    // Save Address in the database
    Address.create(address, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Address."
        });
      else res.send(data);
    });
  };

// // Retrieve all Addresses from the database.
// exports.findAll = (req, res) => {
//     Address.getAll((err, data) => {
//       if (err)
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving addresses."
//         });
//       else res.send(data);
//     });
//   };

// Retrieve all Addresses by page from the database.
const Paginator = (items, page, per_page) => {
  var page = page || 1,
  per_page = per_page || 10,
  offset = (page - 1) * per_page,
 
  paginatedItems = items.slice(offset).slice(0, per_page),
  total_pages = Math.ceil(items.length / per_page);
  return {
    data: paginatedItems,
    currentPage: Number(page), 
    numberOfPages: total_pages
  };
}

exports.findAll = async (req, res) => {
  const { page, type } = req.query;
    Address.getAll(type, (err, data) => {
      if (err){
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving addresses."
        });
      } else {
        res.send(Paginator(data, page, 8))
      };
    });
  };

// Find a single Address with a addressId
exports.findOne = async (req, res) => {
    Address.findById(req.params.addressId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Address with id ${req.params.addressId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Address with id " + req.params.addressId
          });
        }
      } else res.send(data);
    });
  };

// Update a Address identified by the addressId in the request
exports.update = async (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
   Address.updateById(
      req.params.addressId,
      new Address(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Address with id ${req.params.addressId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Address with id " + req.params.addressId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Address with the specified addressId in the request
exports.delete = async (req, res) => {
    Address.remove(req.params.addressId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Address with id ${req.params.addressId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Address with id " + req.params.addressId
          });
        }
      } else res.send({ message: `Address was deleted successfully!` });
    });
  };

// Delete all Addresses from the database.
exports.deleteAll = async (req, res) => {
    Address.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all addresses."
        });
      else res.send({ message: `All Addresses were deleted successfully!` });
    });
  };

// Delete all Addresses from the database.
exports.setAllSelectedAddressToFalse = async (req, res) => {
  const { type } = req.query;
    Address.setAllSelectedToFalse(type, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all addresses."
        });
      else res.send({ message: `All Selected Addresses were set to false successfully!` });
    });
  };


exports.getSelectedFulfilmentAddress = async (req, res) => {
    Address.getSelectedFulfilmentAddress((err, data) => {
      if (err){
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving SelectedFulfilmentAddress."
        });
      } else {
        res.send(data)
      };
    });
  };

exports.getSelectedInvoiceAddress = async (req, res) => {
    Address.getSelectedInvoiceAddress((err, data) => {
      if (err){
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving SelectedInvoiceAddress."
        });
      } else {
        res.send(data)
      };
    });
  };
