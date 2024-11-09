const db = require("../models");
const Comment = db.comment;

exports.create = (req, res) => {
  const comment = {
    content: req.body.content,
    createdBy: req.body.createdBy,
    announcementId: req.body.announcementId,
  };

  Comment.create(comment)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAllByAnnouncementId = (req, res) => {
  const announcementId = req.params.announcementId;

  Comment.findAll({ where: { announcementId: announcementId } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Comment.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) res.send({ message: "Deleted successfully" });
      else res.send({ message: `Cannot delete Comment with id=${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};
