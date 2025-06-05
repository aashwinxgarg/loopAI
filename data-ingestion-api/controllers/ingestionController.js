const { createIngestion } = require("../models/ingestionStore");

exports.ingestHandler = (req, res) => {
  const { ids, priority } = req.body;
  if (!ids || !priority || !["HIGH", "MEDIUM", "LOW"].includes(priority)) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const ingestion_id = createIngestion(ids, priority);
  res.json({ ingestion_id });
};
