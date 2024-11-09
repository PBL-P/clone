module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
    const router = require("express").Router();
  
    router.post("/", comments.create);
    router.get("/announcement/:announcementId", comments.findAllByAnnouncementId);
    router.delete("/:id", comments.delete);
  
    app.use("/api/comments", router);
};  