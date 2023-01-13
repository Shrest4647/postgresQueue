const { Client } = require("pg");

const client = new Client({
  host: "my.database-server.com",
  port: 5334,
  user: "database-user",
  password: "secretpassword!!",
});

client
  .connect()
  .then(() => console.log("connected"))
  .catch((err) => console.error("connection error", err.stack));

client.on("error", (err) => {
  console.error("something bad has happened!", err.stack);
});

client
  .end()
  .then(() => console.log("client has disconnected"))
  .catch((err) => console.error("error during disconnection", err.stack));

module.exports = { client };
