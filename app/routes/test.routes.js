module.exports = app => {
    const tutorials = require("../controllers/test.controller.js");
  
    var router = require("express").Router();

    app.use('/testApi/tutorials', router);
  
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);
  
  };