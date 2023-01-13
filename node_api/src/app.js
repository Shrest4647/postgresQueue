const PgBoss = require("pg-boss");
const boss = new PgBoss({connectionString: "postgres://postgres:postgres@localhost:5438/postgres", monitorStateIntervalSeconds: 2 } );

async function someAsyncJobHandler0(job) {
  console.log(`job ${job.id} received with data: 0`);
  console.log(JSON.stringify(job.data));
  let res = await doSomethingAsyncWithThis(job.data);
  await boss.complete(job.id, { res })
}
async function someAsyncJobHandler1(job) {
  console.log(`job ${job.id} received with data: 1`);
  console.log(JSON.stringify(job.data));
  let res = await doSomethingAsyncWithThis(job.data);
  await boss.complete(job.id, { res })
}
async function someAsyncJobHandler2(job) {
  console.log(`job ${job.id} received with data: 2`);
  console.log(JSON.stringify(job.data));
  let res = await doSomethingAsyncWithThis(job.data);
  await boss.complete(job.id, { res })

}

async function doSomethingAsyncWithThis(data) {
  await stall(10000);
  console.log(data);
  return `Processed: ${data}`;
}

async function stall(stallTime = 3000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
}

module.exports = { someAsyncJobHandler0, someAsyncJobHandler1, someAsyncJobHandler2 }