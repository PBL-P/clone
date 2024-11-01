module.exports = app => {
  const proposals = require("../controllers/proposal.controller.js");
  const instructions = require("../controllers/instruction.controller.js");

  var router = require("express").Router();

  // 제안서 - 작성 방법 및 예시 관련 라우트
  router.get("/proposal", instructions.findAll);
  router.get("/proposal/:id", instructions.findOne);
  router.post("/proposal/register", instructions.create);
  router.put("/proposal/register/:id", instructions.update);
  router.delete("/proposal/:id", instructions.delete);
  router.delete("/proposal", instructions.deleteAll);
  router.get("/proposal/search", instructions.findByTitle)

  // 제안서 - 제출 관련 라우트
  router.get("/proposal/submit", proposals.s_getAll);
  router.get("/proposal/submit/:id", proposals.s_get);
  router.post("/proposal/submit/register", proposals.s_create);
  router.put("/proposal/submit/register/:id", proposals.s_update);
  router.delete("/proposal/submit/:id", proposals.s_delete);
  router.delete("/proposal/submit", proposals.s_deleteAll);
  router.get("/proposal/submit/search", proposals.s_findByTitle)

  app.use('/api', router);
};

// 승바승바