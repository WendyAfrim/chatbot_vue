module.exports = (sequelize, Sequelize) => {
    const ChatRoom = sequelize.define("chat_room", {
      name: {
        type: Sequelize.STRING
      },
      capacity: {
        type: Sequelize.SMALLINT
      },
      state: {
        type: Sequelize.STRING
      },
      numberOfguests: {
        type: Sequelize.SMALLINT
      },
      open: {
        type: Sequelize.BOOLEAN
      },
    });
  
    return ChatRoom;
};