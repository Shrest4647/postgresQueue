const { boss } = require("./queue/boss");

async function squareHandler(job) {
  await stall(5000);
  let res = Math.pow(job.data.value, 2);
  await boss.complete(job.id, { res });
}
async function squarerootHandler(job) {
  await stall(5000);
  let res = Math.sqrt(job.data.value);
  await boss.complete(job.id, { res });
}
async function cubeHandler(job) {
  await stall(5000);
  let res = Math.pow(job.data.value, 3);
  await boss.complete(job.id, { res });
}
async function stall(stallTime = 3000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
}

module.exports = { squareHandler, squarerootHandler, cubeHandler, stall };
