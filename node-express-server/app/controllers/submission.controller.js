const db = require("../models");
const Submission = db.submission;
const Op = db.Sequelize.Op;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// multer 설정 - 파일 업로드 처리
const storageSubmissions = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/submissions/'), // 'uploads/submissions/' 디렉토리 지정
    filename: (req, file, cb) => {
      const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
      cb(null, originalName);
    }
  });
  
const uploadSubmissions = multer({ storage: storageSubmissions });

// 파일 삭제 함수
const deleteFile = (filePath) => {
  if (filePath) {
    fs.unlink(filePath, (err) => {
      if (err) console.log("Failed to delete file:", err);
    });
  }
};

// 새로운 제출 항목 생성
exports.create = [uploadSubmissions.single('file'), (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const decodedFileName = req.file ? Buffer.from(req.file.originalname, 'latin1').toString('utf8') : null;
  const submission = {
    document_type_id: req.body.document_type_id,
    title: req.body.title,
    content: req.body.content,
    file_name: decodedFileName,
    file_path: req.file ? req.file.path : null
  };

  Submission.create(submission)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error occurred while creating the Submission." }));
}];

// 모든 제출 항목 조회
exports.findAll = (req, res) => {
  const title = req.query.title;
  const documentTypeId = req.query.document_type_id;
  const condition = {
    ...(title && { title: { [Op.like]: `%${title}%` } }),
    ...(documentTypeId && { document_type_id: documentTypeId })
  };

  Submission.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error occurred while retrieving submissions." }));
};

// 특정 제출 항목 조회
exports.findOne = (req, res) => {
  const id = req.params.id;

  Submission.findByPk(id)
    .then(data => data ? res.send(data) : res.status(404).send({ message: `Cannot find Submission with id=${id}.` }))
    .catch(err => res.status(500).send({ message: "Error retrieving Submission with id=" + id }));
};

// 제출 항목 업데이트
exports.update = [uploadSubmissions.single('file'), (req, res) => {
  const id = req.params.id;

  Submission.findByPk(id)
    .then(submission => {
      if (!submission) {
        return res.status(404).send({ message: `Cannot find Submission with id=${id}.` });
      }

      const decodedFileName = req.file ? Buffer.from(req.file.originalname, 'latin1').toString('utf8') : submission.file_name;
      const updatedData = {
        document_type_id: req.body.document_type_id || submission.document_type_id,
        title: req.body.title || submission.title,
        content: req.body.content || submission.content,
        file_name: req.file ? decodedFileName : submission.file_name,
        file_path: req.file ? req.file.path : submission.file_path
      };

      Submission.update(updatedData, { where: { id: id } })
        .then(num => num == 1 ? res.send({ message: "Submission was updated successfully." }) : res.send({ message: `Cannot update Submission with id=${id}.` }))
        .catch(err => res.status(500).send({ message: "Error updating Submission with id=" + id }));
    })
    .catch(err => res.status(500).send({ message: "Error retrieving Submission with id=" + id }));
}];

// 제출 항목 삭제
exports.delete = (req, res) => {
  const id = req.params.id;

  Submission.findByPk(id)
    .then(submission => {
      if (submission) deleteFile(submission.file_path);
      return Submission.destroy({ where: { id: id } });
    })
    .then(num => num == 1 ? res.send({ message: "Submission was deleted successfully!" }) : res.send({ message: `Cannot delete Submission with id=${id}. Maybe Submission was not found!` }))
    .catch(err => res.status(500).send({ message: "Could not delete Submission with id=" + id }));
};

// 특정 조건에 따른 모든 제출 항목 삭제
exports.deleteAll = (req, res) => {
  const documentTypeId = req.query.document_type_id;
  const condition = documentTypeId ? { document_type_id: documentTypeId } : null;

  Submission.findAll({ where: condition })
    .then(submissions => {
      submissions.forEach(submission => deleteFile(submission.file_path));
      return Submission.destroy({ where: condition });
    })
    .then(nums => res.send({ message: `${nums} submissions were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all submissions." }));
};

// 제목으로 제출 항목 검색
exports.findByTitle = (req, res) => {
  const title = req.query.title;
  Submission.findAll({ where: { title: { [Op.like]: `%${title}%` } } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Error occurred while searching by title" }));
};
