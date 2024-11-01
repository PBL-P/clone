const db = require("../models");
const Proposal = db.proposal;
const Op = db.Sequelize.Op;
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // 파일 삭제를 위해 fs 모듈 추가

// 파일 업로드를 위한 multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')  // 'uploads/' 디렉토리에 파일 저장
  },
  filename: function (req, file, cb) {
    // 파일명에 한글, 특수문자가 있을 경우를 대비해 UTF-8로 인코딩
    const fileName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, Date.now() + path.extname(fileName));  // 파일명 중복 방지
  }
});

const upload = multer({ storage: storage });

// Create and Save a new Proposal
exports.create = [upload.single('file'), (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Proposal
  const proposal = {
    title: req.body.title,
    teamName: req.body.teamName,
    member: req.body.member,
    thought: req.body.thought,
    fileName: req.file ? req.file.originalname : null,
    filePath: req.file ? req.file.path : null
  };

  // Save Proposal in the database
  Proposal.create(proposal)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Proposal."
      });
    });
}];


// Retrieve all proposal from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Proposal.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving proposal."
      });
    });
};

// Find a single Proposal with an id
exports.findOne = (req, res) => {
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

// Update a Proposal by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Proposal.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Proposal was updated successfully."
        });
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

// Delete a Proposal with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Proposal.findByPk(id)
    .then(proposal => {
      if (proposal && proposal.filePath) {
        // 파일 삭제
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
        res.send({ message: `Cannot delete Proposal with id=${id}. Maybe Proposal was not found!` });
      }
    })
    .catch(err => res.status(500).send({ message: "Could not delete Proposal with id=" + id }));
};

// Delete all proposal from the database.
exports.deleteAll = (req, res) => {
  Proposal.findAll()
    .then(proposals => {
      // 모든 파일 삭제
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
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all proposals." }));
};

// find all published Proposal
exports.findAllPublished = (req, res) => {
  Proposal.findAll({ where: { published: true } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while retrieving proposals." }));
};

///// 여기서 부터 제출용 함수들!! 라우터 순서에 맞게 함수 배치핸 /////

// 제출된 모든 제안서를 검색하는 메서드
exports.s_getAll = (req, res) => {
  Proposal.findAll()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving proposals."
      });
    });
};

// 특정 ID로 제출된 제안서를 검색하는 메서드
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

// 새로운 제안서를 제출하는 메서드
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

// 특정 ID의 제출된 제안서를 업데이트하는 메서드
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

// 특정 ID의 제출된 제안서를 삭제하는 메서드
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

// 모든 제출된 제안서를 삭제하는 메서드
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

// 특정 제목으로 제출 항목 검색하는 메서드
exports.s_findByTitle = (req, res) => {
  const title = req.query.title; // 쿼리 매개변수로 제목 가져옴

  Proposal.findAll({ where: { title: { [Op.like]: `%${title}%` } } })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error occurred while searching by title"
      });
    });
};
