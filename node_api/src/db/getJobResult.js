const { boss } = require("../queue/boss");
const { pool } = require("./pool");

async function getJobResult(job_id) {
  let job = await boss.getJobById(job_id);
  if (job.state === "completed") {
    pool
      .query("SELECT * FROM job_result WHERE job_id = $1", [job_id])
      .then((res) => {
        return res.rows[0];
      })
      .catch((err) =>
        setImmediate(() => {
          throw err;
        })
      );
  } else if (job.state in ["active", "created", "retry"]) {
    return { message: "Job In Progress" };
  } else if (job.state === "cancelled") {
    return { message: "Job Cancelled" };
  } else if (job.state === "expired") {
    return { message: "Job Expired" };
  } else {
    return { message: "Job Failed" };
  }
}

module.exports = { getJobResult };
