module.exports = (sequelize, Sequelize) => {
    const ChatRoom = sequelize.define("chat_room", {
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      open: {
        type: Sequelize.BOOLEAN
      },
    });
  
    return ChatRoom;
};