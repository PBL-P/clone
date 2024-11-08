module.exports = (sequelize, Sequelize) => {
    const Announcement = sequelize.define("announcement", {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return Announcement;
  };  