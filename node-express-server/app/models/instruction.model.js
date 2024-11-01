module.exports = (sequelize, Sequelize) => {
    const Instruction = sequelize.define("instruction", {
      document_type_id: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
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
      tableName: 'instructions', // 테이블 이름을 명시적으로 설정
      timestamps: true, // timestamps 설정
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  
    return Instruction;
  };
  