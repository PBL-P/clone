module.exports = (sequelize, Sequelize) => {
  const Submission = sequelize.define("submission", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,  // 이 부분 추가
    },
    document_type_id: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    teamName: {
      type: Sequelize.STRING,
    },
    member: {
      type: Sequelize.STRING,
    },
    thought: {
      type: Sequelize.STRING,
    },
    fileName: {
      type: Sequelize.STRING,
    },
    filePath: {
      type: Sequelize.STRING,
    },      
    timestamps: true, // timestamps 설정
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Submission;
};
