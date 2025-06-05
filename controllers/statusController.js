const { getIngestion } = require("../models/ingestionStore");

exports.statusHandler = (req, res) => {
  const { ingestion_id } = req.params;
  const ingestion = getIngestion(ingestion_id);
  if (!ingestion) return res.status(404).json({ error: "Not found" });

  const all = ingestion.batches.map((b) => b.status);
  let status = "yet_to_start";
  if (all.every((s) => s === "completed")) status = "completed";
  else if (all.some((s) => s === "triggered" || s === "completed")) status = "triggered";

  res.json({
    ingestion_id,
    status,
    batches: ingestion.batches.map((b) => ({
      batch_id: b.batch_id,
      ids: b.ids,
      status: b.status,
    })),
  });
};
