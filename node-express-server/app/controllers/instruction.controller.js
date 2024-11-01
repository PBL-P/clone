const db = require("../models");
const Instruction = db.instruction;
const Op = db.Sequelize.Op;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 파일 업로드를 위한 multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const fileName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, Date.now() + path.extname(fileName));
  }
});

const upload = multer({ storage: storage });

// Create and Save a new Instruction
exports.create = [upload.single('file'), (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const instruction = {
    document_type_id: req.body.document_type_id,
    title: req.body.title,
    content: req.body.content,
    file_name: req.file ? req.file.originalname : null,
    file_path: req.file ? req.file.path : null
  };

  Instruction.create(instruction)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Instruction."
      });
    });
}];

// Retrieve all instructions
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Instruction.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving instructions."
      });
    });
};

// Find a single Instruction with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Instruction.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Instruction with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Instruction with id=" + id
      });
    });
};

// Update an Instruction by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Instruction.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Instruction was updated successfully." });
      } else {
        res.send({
          message: `Cannot update Instruction with id=${id}. Maybe Instruction was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Instruction with id=" + id
      });
    });
};

// Delete an Instruction with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Instruction.findByPk(id)
    .then(instruction => {
      if (instruction && instruction.file_path) {
        fs.unlink(instruction.file_path, (err) => {
          if (err) console.log("Failed to delete file:", err);
        });
      }
      return Instruction.destroy({ where: { id: id } });
    })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Instruction was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Instruction with id=${id}. Maybe Instruction was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Instruction with id=" + id
      });
    });
};

// Delete all instructions from the database
exports.deleteAll = (req, res) => {
  Instruction.findAll()
    .then(instructions => {
      instructions.forEach(instruction => {
        if (instruction.file_path) {
          fs.unlink(instruction.file_path, (err) => {
            if (err) console.log("Failed to delete file:", err);
          });
        }
      });
      return Instruction.destroy({ where: {}, truncate: false });
    })
    .then(nums => res.send({ message: `${nums} instructions were deleted successfully!` }))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while removing all instructions."
    }));
};

// Find instructions by title
exports.findByTitle = (req, res) => {
  const title = req.query.title;

  Instruction.findAll({ where: { title: { [Op.like]: `%${title}%` } } })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error occurred while searching by title"
      });
    });
};
