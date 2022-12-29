module.exports = app => {
    const chatroom = require("../controllers/chatroom.controller.js");
  
    var router = require("express").Router();
  
    // Create a new ChatRoom
    router.post("/", chatroom.create);

    // Retrieve all ChatRoom
    router.get("/", chatroom.findAll);

    // Retrieve a single Chatroom with id
    router.get("/:id", chatroom.findOneById);
  
    // Update a ChatRoom with id
    router.put("/:id", chatroom.update);
  
    // Delete a ChatRoom with id
    router.delete("/:id", chatroom.delete);
  
    app.use('/api/chatrooms', router);
  };