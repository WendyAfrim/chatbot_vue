const db = require("../models");
const Chat = db.chat;
const Op = db.Sequelize.Op;

// Retrieve all Chat from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Chat.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Chat."
      });
    });
};

exports.create = (req, res) => {

  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  res.status(200).send('ok');


  // Create a Chat
  // const chat = {
  //   name: req.body.name,
  //   message: req.body.message,
  //   chatroom: req.body.room
  // };


  // Save Chat in the database
  // Chat.create(chat)
  //   .then(data => {
  //     res.status(200).send('ok');
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the Chatroom."
  //     });
  //   });
};

