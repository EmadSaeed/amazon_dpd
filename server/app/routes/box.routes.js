module.exports = app => {
    const box = require("../controllers/box.controller");
  
    app.get("/box", box.getBox);
  
  };