module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new UserSocket
    router.post("/", users.create);

    // login
    router.post("/login", users.login);
  
    // Retrieve all UserSocket
    router.get("/", users.findAll);
  
    // Retrieve all published UserSocket
    router.get("/online", users.findAllOnline);
  
    // Retrieve a single UserSocket with id
    router.get("/:id", users.findOne);
  
    // Update a UserSocket with id
    router.put("/:id", users.update);
  
    // Delete a UserSocket with id
    router.delete("/:id", users.delete);
  
    app.use('/api/users', router);
  };