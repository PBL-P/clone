const db = require("../models");
const Proposal = db.proposal;
const Op = db.Sequelize.Op;
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // 파일 삭제를 위해 fs 모듈 추가

// 파일 업로드 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const fileName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, Date.now() + path.extname(fileName));
  }
});

const upload = multer({ storage: storage });

// 제출된 제안서 - 모든 항목 검색
exports.s_getAll = (req, res) => {
  Proposal.findAll()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving proposals."
      });
    });
};

// 제출된 제안서 - 특정 ID 검색
exports.s_get = (req, res) => {
  const id = req.params.id;

  Proposal.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Proposal with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Proposal with id=" + id
      });
    });
};

// 제출된 제안서 - 새 항목 생성
exports.s_create = [upload.single('file'), (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const proposal = {
    title: req.body.title,
    teamName: req.body.teamName,
    member: req.body.member,
    thought: req.body.thought,
    fileName: req.file ? req.file.originalname : null,
    filePath: req.file ? req.file.path : null
  };

  Proposal.create(proposal)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Proposal."
      });
    });
}];

// 제출된 제안서 - 특정 ID 업데이트
exports.s_update = (req, res) => {
  const id = req.params.id;

  Proposal.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Proposal was updated successfully." });
      } else {
        res.send({
          message: `Cannot update Proposal with id=${id}. Maybe Proposal was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Proposal with id=" + id
      });
    });
};

// 제출된 제안서 - 특정 ID 삭제
exports.s_delete = (req, res) => {
  const id = req.params.id;

  Proposal.findByPk(id)
    .then(proposal => {
      if (proposal && proposal.filePath) {
        fs.unlink(proposal.filePath, (err) => {
          if (err) console.log("Failed to delete file:", err);
        });
      }
      return Proposal.destroy({ where: { id: id } });
    })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Proposal was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Proposal with id=${id}. Maybe Proposal was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Proposal with id=" + id
      });
    });
};

// 제출된 제안서 - 모든 항목 삭제
exports.s_deleteAll = (req, res) => {
  Proposal.findAll()
    .then(proposals => {
      proposals.forEach(proposal => {
        if (proposal.filePath) {
          fs.unlink(proposal.filePath, (err) => {
            if (err) console.log("Failed to delete file:", err);
          });
        }
      });
      return Proposal.destroy({ where: {}, truncate: false });
    })
    .then(nums => res.send({ message: `${nums} proposals were deleted successfully!` }))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while removing all proposals."
    }));
};

// 제출된 제안서 - 제목으로 항목 검색
exports.s_findByTitle = (req, res) => {
  const title = req.query.title;

  Proposal.findAll({ where: { title: { [Op.like]: `%${title}%` } } })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error occurred while searching by title"
      });
    });
};
