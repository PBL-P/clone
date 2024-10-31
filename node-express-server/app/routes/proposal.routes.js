module.exports = app => {
  const proposals = require("../controllers/proposal.controller.js");

  var router = require("express").Router();

  // 제안서 - 작성 방법 및 예시 관련 라우트
  router.get("/proposal", proposals.getAll);
  router.get("/proposal/:id", proposals.get);
  router.post("/proposal/register", proposals.create);
  router.put("/proposal/register/:id", proposals.update);
  router.delete("/proposal/:id", proposals.delete);
  router.delete("/proposal", proposals.deleteAll);
  router.get("/proposal/search", proposals.findByTitle)

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