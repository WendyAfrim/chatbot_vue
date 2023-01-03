module.exports = app => {
    const chat = require("../controllers/chat.controller.js");
  
    var router = require("express").Router();
  
    // Create a new chat
    router.post("/", chat.create);

    // Retrieve all chat
    router.get("/", chat.findAll);

    app.use('/api/chats', router);
  };