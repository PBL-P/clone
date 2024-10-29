module.exports = app => {
  const proposals = require("../controllers/proposal.controller.js");

  var router = require("express").Router();

  // Create a new Proposal
  // 제안서 라우트
  router.post("/proposal/submit", proposals.create);

  // Retrieve all Proposal
  router.get("/proposal", proposals.findAll);

  // Retrieve all published Proposal
  router.get("/published", proposals.findAllPublished);

  // Retrieve a single Proposal with id
  router.get("/:id", proposals.findOne);

  // Update a Proposal with id
  router.put("/:id", proposals.update);

  // Delete a Proposal with id
  router.delete("/proposal/:id", proposals.delete);

  // Delete all Proposal
  router.delete("/", proposals.deleteAll);

  app.use('/api', router);
};
