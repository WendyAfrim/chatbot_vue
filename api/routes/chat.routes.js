module.exports = app => {
    const chat = require("../controllers/chat.controller.js");
  
    var router = require("express").Router();
  
    // Create a new chat
    router.post("/", chat.create);

    // Retrieve all chat
    router.get("/", chat.findAll);

    // Retrieve all message by room
    router.get("/room/:room", chat.findByRoom);

    app.use('/api/chats', router);
  };