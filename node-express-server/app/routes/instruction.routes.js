module.exports = app => {
  const instructions = require("../controllers/instruction.controller.js"); // controller 경로 확인
  var router = require("express").Router();

  // 공통 라우트 - 모든 문서 유형 조회 및 CRUD
  router.get("/documents", instructions.findAll); // 모든 문서 조회
  router.get("/documents/:id", instructions.findOne); // 특정 문서 조회
  router.post("/documents/register", instructions.create); // 문서 등록
  router.put("/documents/register/:id", instructions.update); // 문서 수정
  router.delete("/documents/:id", instructions.delete); // 특정 문서 삭제
  router.delete("/documents", instructions.deleteAll); // 모든 문서 삭제

  app.use('/api', router);
};
