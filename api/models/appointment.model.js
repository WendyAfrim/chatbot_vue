module.exports = (sequelize, Sequelize) => {
    const Appointment = sequelize.define("appointment", {
      date: {
        type: Sequelize.DATE
      },
      time: {
        type: Sequelize.TIME
      },
      type: {
        type: Sequelize.STRING
      },
    });
  
    return Appointment;

}