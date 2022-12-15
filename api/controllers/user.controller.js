const db = require("../models");
const UserSocket = db.usersSocket;
const Op = db.Sequelize.Op;

// Create and Save a new UserSocket
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a UserSocket
    const userSocket = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      online: req.body.online ? req.body.online : false
    };
  
    // Save UserSocket in the database
    UserSocket.create(userSocket)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the UserSocket."
        });
      });
  };

// Retrieve all UserSocket from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    UserSocket.findAll({ where: condition })
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

// Find a single UserSocket with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    UserSocket.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find UserSocket with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving UserSocket with id=" + id
        });
      });
  };

// Update a UserSocket by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    UserSocket.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "UserSocket was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update UserSocket with id=${id}. Maybe UserSocket was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating UserSocket with id=" + id
        });
      });
  };
// Delete a UserSocket with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    UserSocket.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "UserSocket was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete UserSocket with id=${id}. Maybe UserSocket was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete UserSocket with id=" + id
        });
      });
  };

// Find all user online 
exports.findAllOnline = (req, res) => {
    UserSocket.findAll({ where: { online: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving UserSocket."
        });
      });
  };