module.exports = (sequelize, Sequelize) => {
    const Chat = sequelize.define("chat", {
      name: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      chatroom: {
        type: Sequelize.STRING
      },
    });
  
    return Chat;
}