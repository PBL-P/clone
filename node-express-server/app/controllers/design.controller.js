
const db = require("../models");
const Design = db.design;
const Op = db.Sequelize.Op;
const multer = require('multer');
const path = require('path');

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

// Create and Save a new Design
exports.create = [upload.single('file'), (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Design
    const design = {
        title: req.body.title,
        teamName: req.body.teamName,
        member: req.body.member,
        thought: req.body.thought,
        fileName: req.file ? req.file.originalname : null,
        filePath: req.file ? req.file.path : null
    };

    // Save Design in the database
    Design.create(design)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Design."
            });
        });
}];

// Retrieve all Designs from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Design.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving designs."
            });
        });
};

// Find a single Design with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Design.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Design with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Design with id=" + id
            });
        });
};

// Update a Design by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Design.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Design was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Design with id=${id}. Maybe Design was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Design with id=" + id
            });
        });
};

// Delete a Design with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Design.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Design was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Design with id=${id}. Maybe Design was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Design with id=" + id
            });
        });
};

// Delete all Designs from the database.
exports.deleteAll = (req, res) => {
    Design.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} designs were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all designs."
            });
        });
};

// find all published Designs
exports.findAllPublished = (req, res) => {
    Design.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving designs."
            });
        });
};
