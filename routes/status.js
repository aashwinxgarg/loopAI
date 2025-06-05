const express = require("express");
const router = express.Router();
const { statusHandler } = require("../controllers/statusController");

router.get("/:ingestion_id", statusHandler);

module.exports = router;