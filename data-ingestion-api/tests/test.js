const axios = require("axios");
(async () => {
  const base = "http://localhost:5000";

  const res1 = await axios.post(`${base}/ingest`, {
    ids: [1, 2, 3, 4, 5],
    priority: "MEDIUM",
  });
  const id1 = res1.data.ingestion_id;
  console.log("Ingested", id1);

  await new Promise((res) => setTimeout(res, 4000));

  const res2 = await axios.post(`${base}/ingest`, {
    ids: [6, 7, 8, 9],
    priority: "HIGH",
  });
  const id2 = res2.data.ingestion_id;
  console.log("Ingested", id2);

  const wait = (ms) => new Promise((res) => setTimeout(res, ms));
  await wait(16000);

  const status1 = await axios.get(`${base}/status/${id1}`);
  const status2 = await axios.get(`${base}/status/${id2}`);

  console.log("Status 1", status1.data);
  console.log("Status 2", status2.data);
})();
