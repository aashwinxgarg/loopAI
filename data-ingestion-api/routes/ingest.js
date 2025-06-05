const express = require("express");
const router = express.Router();
const { ingestHandler } = require("../controllers/ingestionController");

router.post("/", ingestHandler);

module.exports = router;