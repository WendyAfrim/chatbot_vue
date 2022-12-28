module.exports = app => {
    const appointment = require("../controllers/appointment.controller.js");
  
    var router = require("express").Router();
  
    // Create a new ChatRoom
    router.post("/", appointment.create);

    // Retrieve all ChatRoom
    router.get("/", appointment.findAll);
  
    // Update a ChatRoom with id
    router.put("/:id", appointment.update);
  
    // Delete a ChatRoom with id
    router.delete("/:id", appointment.delete);
  
    app.use('/api/appointment', router);
  };