const { pool } = require("./pool");

async function saveJobResult(job) {
  try {
    await pool.query("BEGIN");
    const queryText = "INSERT INTO job_result(job_id, job_data) VALUES($1, $2)";
    const res = await pool.query(queryText, [job.id, JSON.stringify(job.data)]);
    await pool.query("COMMIT");
  } catch (e) {
    await pool.query("ROLLBACK");
    throw e;
  } finally {
    pool.release();
  }
}

module.exports = { saveJobResult };
