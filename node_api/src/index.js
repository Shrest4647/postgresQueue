// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const PgBoss = require("pg-boss");
const { someAsyncJobHandler0, someAsyncJobHandler1, someAsyncJobHandler2 } = require('./app');

// defining the Express app
const app = express();

const boss = new PgBoss({connectionString: "postgres://postgres:postgres@localhost:5438/postgres", monitorStateIntervalSeconds: 2 } );
boss.on("error", (error) => console.error(error));
// boss.on("monitor-states", (payload) => {
//   console.log(payload);
// });
boss.on("wip", (payload) => {
    console.log(payload)
})
let queue = "task_queue";
boss.start().then(async _ => {
    await boss.work(queue, { teamSize: 5, teamRefill: true}, someAsyncJobHandler0);
});


// defining an array to work as the database (temporary solution)
const ads = [{ title: "Hello, world (again)!" }];

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
  res.send(boss);
});

app.post("/add", async (req, res) => {
  let data = req.body;
  let newAd = data.ad;
  let jobId = await boss.send(queue, { ad: newAd }, { retryLimit: 5, retryDelay: 20, expireInSeconds: 60,  });
  res.send(jobId);
});

app.get("/workstatus/:jobId", async (req, res) => {
    job = await boss.getJobById(req.params.jobId);
    res.send(job)
});
// starting the server
app.listen(3001, () => {
  console.log("listening on port 3001");
});
