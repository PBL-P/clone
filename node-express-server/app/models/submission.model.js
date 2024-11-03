module.exports = (sequelize, Sequelize) => {
    const Submission = sequelize.define("submission", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      document_type_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      teamName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      member: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      thought: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      filePath: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    }, {
      tableName: 'submission', // 명시적으로 테이블 이름 설정
      timestamps: true,         // createdAt과 updatedAt 자동 관리
      createdAt: 'createdAt',   // 생성일 필드
      updatedAt: 'updatedAt',   // 수정일 필드
    });
  
    return Submission;
  };
  