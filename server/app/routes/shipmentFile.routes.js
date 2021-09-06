module.exports = app => {
    const shipmentFile = require("../controllers/shipmentFile.controller.js");

    app.get("/writeShipmentFile", shipmentFile.writeShipmentFile);

    app.get("/downloadShipmentFile", shipmentFile.downloadShipmentFile)

  };

  // app.get('/download', function(req, res){ // pass file name in quiery
  //   const file = `${__dirname}/dpd.csv`; // path to folder
  //   res.download(file); // Set disposition and send it.
  // });