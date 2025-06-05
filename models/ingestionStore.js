const { v4: uuidv4 } = require("uuid");

const PRIORITY_VALUES = { HIGH: 1, MEDIUM: 2, LOW: 3 };
const store = {
  ingestions: {},
  queue: [],
};

function createIngestion(ids, priority) {
  const ingestion_id = uuidv4();
  const batches = [];

  for (let i = 0; i < ids.length; i += 3) {
    const batch = {
      batch_id: uuidv4(),
      ids: ids.slice(i, i + 3),
      status: "yet_to_start",
      ingestion_id,
      created_at: Date.now(),
      priority,
    };
    store.queue.push(batch);
    batches.push(batch);
  }

  store.ingestions[ingestion_id] = {
    ingestion_id,
    batches,
  };

  sortQueue();

  return ingestion_id;
}

function sortQueue() {
  store.queue.sort((a, b) => {
    const pa = PRIORITY_VALUES[a.priority];
    const pb = PRIORITY_VALUES[b.priority];
    if (pa !== pb) return pa - pb;
    return a.created_at - b.created_at;
  });
}

function getIngestion(ingestion_id) {
  return store.ingestions[ingestion_id];
}

function getNextBatch() {
  return store.queue.find((b) => b.status === "yet_to_start");
}

function updateBatchStatus(batch_id, status) {
  const batch = store.queue.find((b) => b.batch_id === batch_id);
  if (batch) batch.status = status;
}

module.exports = {
  createIngestion,
  getIngestion,
  getNextBatch,
  updateBatchStatus,
};
