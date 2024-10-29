
module.exports = app => {
    const designs = require("../controllers/design.controller.js");

    var router = require("express").Router();

    // Create a new Design
    router.post("/design/submit", designs.create);

    // Retrieve all Designs
    router.get("/design", designs.findAll);

    // Retrieve all published Designs
    router.get("/design/published", designs.findAllPublished);

    // Retrieve a single Design with id
    router.get("/design/:id", designs.findOne);

    // Update a Design with id
    router.put("/design/:id", designs.update);

    // Delete a Design with id
    router.delete("/design/:id", designs.delete);

    // Delete all Designs
    router.delete("/design", designs.deleteAll);

    app.use('/api', router);
};
