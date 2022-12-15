module.exports = (sequelize, Sequelize) => {
    const UserSocket = sequelize.define("user_socket", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      online: {
        type: Sequelize.BOOLEAN
      },
    });
  
    return UserSocket;
  };