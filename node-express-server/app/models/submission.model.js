module.exports = (sequelize, Sequelize) => {
    const Submission = sequelize.define("submission", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      document_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
      },
      file_name: {
        type: Sequelize.STRING,
      },
      file_path: {
        type: Sequelize.STRING,
      },
    }, {
      timestamps: true, // 생성일과 수정일 자동 관리
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  
    return Submission;
  };
  