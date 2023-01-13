const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { saveJobResult } = require("./db/saveJobResult");
const { queues, boss } = require("./queue/boss");

const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

// defining an endpoint to return all ads
app.get("/", (req, res) => {
  res.send(boss.getQueueSize(queues[0]));
});

app.post("/square", async (req, res) => {
  let value = req.body.value;
  let jobId = await boss.send(
    queues[0],
    { value },
    { retryLimit: 5, retryDelay: 20, expireInSeconds: 60 }
  );
  boss.onComplete(jobId, (job) => {
    saveJobResult(job);
  });
  res.send(jobId);
});

app.post("/squareroot", async (req, res) => {
  let value = req.body.value;
  let jobId = await boss.send(
    queues[1],
    { value },
    { retryLimit: 5, retryDelay: 20, expireInSeconds: 60 }
  );
  boss.onComplete(jobId, (job) => {
    saveJobResult(job);
  });
  res.send(jobId);
});

app.post("/cube", async (req, res) => {
  let value = req.body.value;
  let jobId = await boss.send(
    queues[2],
    { value },
    { retryLimit: 5, retryDelay: 20, expireInSeconds: 60 }
  );
  boss.onComplete(jobId, (job) => {
    saveJobResult(job);
  });
  res.send(jobId);
});

app.get("/status/:jobId", async (req, res) => {
  let job = await boss.getJobById(req.params.jobId);
  res.send(job);
});

app.get("/results/:jobId", async (req, res) => {
  let result = getJobById(req.params.jobId);
  res.send(result);
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
