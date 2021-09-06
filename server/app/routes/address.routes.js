module.exports = app => {
    const addresses = require("../controllers/address.controller.js");
  
    // Create a new Address
    app.post("/addresses", addresses.create);
  
    // Retrieve all Addresses
    app.get("/addresses", addresses.findAll);
  
    // Retrieve a single Address with addressId
    app.get("/addresses/:addressId", addresses.findOne);
  
    // Update a Address with addressId
    app.put("/addresses/:addressId", addresses.update);
  
    // Delete a Address with addressId
    app.delete("/addresses/:addressId", addresses.delete);
  
    // Delete all Addresses
    app.delete("/addresses", addresses.deleteAll);
  
    // Set All SelectedAddress To False
    app.put("/selectedAddressToFalse", addresses.setAllSelectedAddressToFalse);
    
    // Get Selected Fulfilment Address
    app.get("/getSelectedFulfilmentAddress", addresses.getSelectedFulfilmentAddress);

    // Get Selected Invoice Address
    app.get("/getSelectedInvoiceAddress", addresses.getSelectedInvoiceAddress);
  };