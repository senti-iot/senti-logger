/**
 * Express Router for Endpoints
 */
const express = require("express");
const router = express.Router();
const appRoot = require("app-root-path");
const fs = require("fs");
const db = require("./database");

/**
 * Logger
 */
const logger = require("../currentImplementation/winstonLogger");

/**
 * Router Endpoints
 */

router.post("/log-error", async (req, res) => {
  const message = req.body;
  await db.execute("insert into logs SET message = ?, level = 'error'", [
    JSON.stringify(message)
  ]);
  logger.error(message);
  res.status(200).json();
});

router.post("/log-info", async (req, res) => {
  const message = req.body;
  await db.execute("insert into logs SET message = ?, level = 'info'", [
    JSON.stringify(message)
  ]);
  logger.info(message);
  res.status(200).json();
});

router.get("/log-info", async (req, res) => {
  // const logs = await fs.readFile(`${appRoot}/logs/info.log`, (error, data) => {
  //   if (error) {
  //     return res.status(500).json({ msg: "No logs could be found!" });
  //   }

  //   const array = data.toString().split("\n");
  //   db.execute("select * from logs").then(ss => console.log(ss[0][0]));
  //   array.forEach(object => console.log(JSON.parse(object)));
  //   res.send(array);
  // });

  const logs = await db
    .query("select * from logs where level = 'info'")
    .then(results => res.send(results[0]));
});

router.get("/log-error", async (req, res) => {
  const logs = await db
    .query("select * from logs where level = 'error'")
    .then(results => res.send(results[0]));
});

/**
 * Export the configured router
 */

module.exports = router;
