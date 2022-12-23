module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();

    // login
    router.post("/login", users.login);

  
    app.use('/auth', router);
  };