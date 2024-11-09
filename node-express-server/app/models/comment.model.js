module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      announcementId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'announcements',
          key: 'id',
        }
      },
    });
  
    return Comment;
  };  