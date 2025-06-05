const { getNextBatch, updateBatchStatus } = require("../models/ingestionStore");

async function processBatch(batch) {
  updateBatchStatus(batch.batch_id, "triggered");
  await new Promise((res) => setTimeout(res, 1000)); // Simulate fetch for each ID
  for (let id of batch.ids) {
    await new Promise((res) => setTimeout(res, 100)); // per ID processing delay
    console.log({ id, data: "processed" });
  }
  updateBatchStatus(batch.batch_id, "completed");
}

async function runner() {
  while (true) {
    const batch = getNextBatch();
    if (batch) {
      await processBatch(batch);
    }
    await new Promise((res) => setTimeout(res, 5000));
  }
}

runner();