const express = require("express");
const cors = require("cors");
const app = express();

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors())

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server." });
});

require("./app/routes/address.routes.js")(app);
require("./app/routes/products.routes.js")(app);
require("./app/routes/selectedShipment.routes.js")(app);
require("./app/routes/deliveryNote.routes.js")(app);
require("./app/routes/shipperAddress.routes.js")(app);
require("./app/routes/shipmentFile.routes.js")(app);
require("./app/routes/shipments.routes.js")(app);
require("./app/routes/box.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
