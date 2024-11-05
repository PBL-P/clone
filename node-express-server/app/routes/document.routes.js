module.exports = app => {
  const instructions = require("../controllers/instruction.controller.js");
  const submissions = require("../controllers/submission.controller.js");

  const router = require("express").Router();

  // 작성 방법 라우트
  router.get("/instructions", instructions.findAll);
  router.get("/instructions/:id", instructions.findOne);
  router.post("/instructions", instructions.create);
  router.put("/instructions/:id", instructions.update);
  router.delete("/instructions/:id", instructions.delete);
  router.delete("/instructions", instructions.deleteAll);

  // 제출 라우트
  router.get("/submissions", submissions.findAll);
  router.get("/submissions/:id", submissions.findOne);
  router.post("/submissions", submissions.create);
  router.put("/submissions/:id", submissions.update);
  router.delete("/submissions/:id", submissions.delete);
  router.delete("/submissions", submissions.deleteAll);

  app.use('/api', router);
};
