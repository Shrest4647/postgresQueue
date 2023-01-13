const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.POSTGRES_HOST || "localhost",
  user: process.env.POSTGRES_USER || "postgres",
  port: process.env.POSTGRES_PORT || 5432,
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
  max: 15,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  allowExitOnIdle: true,
});

pool
  .connect()
  .then(() => console.log("connected"))
  .catch((err) => console.error("connection error", err.stack));

pool.on("error", (err) => {
  console.error("something bad has happened!", err.stack);
});

pool
  .end()
  .then(() => console.log("client has disconnected"))
  .catch((err) => console.error("error during disconnection", err.stack));

module.exports = { pool };
