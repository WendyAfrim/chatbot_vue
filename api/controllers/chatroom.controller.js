const db = require("../models");
const ChatRoom = db.chatRooms;
const Op = db.Sequelize.Op;


// Create and Save a new ChatRoom
exports.create = (req, res) => {

    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

  
    // Create a UserSocket
    const chatRoom = {
      name: req.body.name,
      type: req.body.type,
      open: true
    };
  
    // Save UserSocket in the database
    ChatRoom.create(chatRoom)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Chatroom."
        });
      });
  };


// Update a ChatRoom by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    ChatRoom.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ChatRoom was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update ChatRoom with id=${id}. Maybe ChatRoom was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating ChatRoom with id=" + id
        });
      });
  };

  // Delete a ChatRoom with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    ChatRoom.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ChatRoom was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete ChatRoom with id=${id}. Maybe ChatRoom was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete ChatRoom with id=" + id
        });
      });
  };


// Retrieve all UserSocket from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  ChatRoom.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving userSocket."
      });
    });
};
