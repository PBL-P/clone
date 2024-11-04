const db = require("../models");
const Instruction = db.instruction;
const Op = db.Sequelize.Op;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 파일 업로드를 위한 multer 설정
    cb(null, originalName); // 파일명에 타임스탬프 추가하여 저장
const storageInstructions = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/instructions/'), // 'uploads/instructions/' 디렉토리 지정
  filename: (req, file, cb) => {
    const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, originalName);
  }
});

const uploadInstructions = multer({ storage: storageInstructions });

// Create and Save a new Instruction
exports.create = [uploadInstructions.single('file'), (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Request File:", req.file);

  if (!req.body.content) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const decodedFileName = req.file ? Buffer.from(req.file.originalname, 'latin1').toString('utf8') : null;

  const instruction = {
    document_type_id: req.body.document_type_id,  // 요청에서 document_type_id 받음
    title: req.body.title,
    content: req.body.content,
    file_name: decodedFileName,
    file_path: req.file ? req.file.path : null
  };

  Instruction.create(instruction)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while creating the Instruction." });
    });
}];

// Retrieve all instructions by document type
exports.findAll = (req, res) => {
  const title = req.query.title;
  const documentTypeId = req.query.document_type_id;
  var condition = { 
    ...(title && { title: { [Op.like]: `%${title}%` } }),
    ...(documentTypeId && { document_type_id: documentTypeId })
  };

  Instruction.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving instructions." });
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
        res.status(404).send({ message: `Cannot find Instruction with id=${id}.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Instruction with id=" + id });
    });
};

// Update an Instruction by the id in the request
exports.update = [uploadInstructions.single('file'), (req, res) => {
  console.log("Update Request Body:", req.body);
  console.log("Update Request File:", req.file);

  const id = req.params.id;

  Instruction.findByPk(id)
    .then(instruction => {
      if (!instruction) {
        res.status(404).send({ message: `Cannot find Instruction with id=${id}.` });
        return;
      }

      const decodedFileName = req.file ? Buffer.from(req.file.originalname, 'latin1').toString('utf8') : instruction.file_name;

      const updatedData = {
        document_type_id: req.body.document_type_id || instruction.document_type_id,
        title: req.body.title || instruction.title,
        content: req.body.content || instruction.content,
        file_name: req.file ? decodedFileName : instruction.file_name,
        file_path: req.file ? req.file.path : instruction.file_path
      };

      Instruction.update(updatedData, { where: { id: id } })
        .then(num => {
          if (num == 1) {
            res.send({ message: "Instruction was updated successfully." });
          } else {
            res.send({ message: `Cannot update Instruction with id=${id}. Maybe Instruction was not found or req.body is empty!` });
          }
        })
        .catch(err => {
          res.status(500).send({ message: "Error updating Instruction with id=" + id });
        });
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Instruction with id=" + id });
    });
}];

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
        res.send({ message: `Cannot delete Instruction with id=${id}. Maybe Instruction was not found!` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete Instruction with id=" + id });
    });
};

// Delete all instructions by document type
exports.deleteAll = (req, res) => {
  const documentTypeId = req.query.document_type_id;

  let condition = documentTypeId ? { document_type_id: documentTypeId } : null;

  Instruction.findAll({ where: condition })
    .then(instructions => {
      instructions.forEach(instruction => {
        if (instruction.file_path) {
          fs.unlink(instruction.file_path, (err) => {
            if (err) console.log("Failed to delete file:", err);
          });
        }
      });
      return Instruction.destroy({ where: condition });
    })
    .then(nums => res.send({ message: `${nums} instructions were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message || "Some error occurred while removing all instructions." }));
};

// Find instructions by title
exports.findByTitle = (req, res) => {
  const title = req.query.title;

  Instruction.findAll({ where: { title: { [Op.like]: `%${title}%` } } })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({ message: err.message || "Error occurred while searching by title" });
    });
};
