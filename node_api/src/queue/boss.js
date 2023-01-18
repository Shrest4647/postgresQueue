const PgBoss = require("pg-boss");
const { lsWithGrep } = require("../command/cmd");
const { squareHandler, squarerootHandler, cubeHandler } = require("../utils");

const queues = ["task0_queue", "task1_queue", "task2_queue", "task3_queue"];

const boss = new PgBoss({
  host: process.env.POSTGRES_HOST || "localhost",
  user: process.env.POSTGRES_USER || "postgres",
  port: process.env.POSTGRES_PORT || 5432,
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
  //   monitorStateIntervalSeconds: 2,
});

boss.on("error", (error) => console.error(error));

boss.on("wip", (payload) => {
  console.log(payload);
});

boss.start().then(async (_) => {
  await boss.work(
    queues[0],
    { teamSize: 5, teamRefill: true, includeMetadata: true },
    squareHandler
  );
  await boss.work(
    queues[1],
    { teamSize: 5, teamRefill: true, includeMetadata: true },
    squarerootHandler
  );
  await boss.work(
    queues[2],
    { teamSize: 5, teamRefill: true, includeMetadata: true },
    cubeHandler
  );
  await boss.work(
    queues[3],
    { teamSize: 1, teamRefill: true, includeMetadata: true },
    lsWithGrep
  );
});

module.exports = { queues, boss };
