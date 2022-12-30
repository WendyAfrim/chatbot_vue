const db = require("../models");
const Appointment = db.appointments;
const Op = db.Sequelize.Op;


// Create and Save a new Appointment
exports.create = (req, res) => {

    // Validate request
    if (!req.body.date || !req.body.time || !req.body.type) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

  
    // Create a Appointment
    const appointment = {
      date: req.body.date,
      time: req.body.time,
      type: req.body.type,
    };
  
    // Save Appointment in the database
    Appointment.create(appointment)
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


// Update a Appointment by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Appointment.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Appointment was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Appointment with id=${id}. Maybe Appointment was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Appointment with id=" + id
        });
      });
  };

  // Delete a Appointment with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Appointment.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Appointment was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Appointment with id=${id}. Maybe Appointment was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Appointment with id=" + id
        });
      });
  };


// Retrieve all Appointment from the database.
exports.findAll = (req, res) => {
  const type = req.body.type;
  const date = req.body.date;
  const time = req.body.time;
  var conditionType = type ? { type: { [Op.like]: `%${type}%` } } : null;
  var conditionDate = date ? { date: { [Op.gte]: date } }: null;
  var conditionTime = time ? { time: { [Op.gte]: time } }: null;
  var conditionArray = [];
  if (conditionType) conditionArray.push(conditionType);
  if (conditionDate) conditionArray.push(conditionDate);
  if (conditionTime) conditionArray.push(conditionTime);

  var condition =  {[Op.and]: conditionArray} ;
  Appointment.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Appointment."
      });
    });
};
