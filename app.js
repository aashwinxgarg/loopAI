const express = require("express");
const app = express();
const ingestRoute = require("./routes/ingest");
const statusRoute = require("./routes/status");
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use("/ingest", ingestRoute);
app.use("/status", statusRoute);

module.exports = app;