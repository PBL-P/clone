module.exports = app => {
  const instructions = require("../controllers/instruction.controller.js"); // controller 경로 확인


  var router = require("express").Router();

  // 제안서 - 작성 방법 및 예시 관련 라우트
  router.get("/proposal", instructions.findAll);
  router.get("/proposal/:id", instructions.findOne);
  router.post("/proposal/register", instructions.create);
  router.put("/proposal/register/:id", instructions.update);
  router.delete("/proposal/:id", instructions.delete);
  router.delete("/proposal", instructions.deleteAll);
  

  app.use('/api', router);
};
