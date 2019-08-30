/**
 * Express Router for Endpoints
 */
const express = require("express");
const router = express.Router();
const moment = require("moment");
const mysqlFormat = "YYYY-MM-DD HH:mm:ss";
/**
 * Logger
 */
const logger = require("../currentImplementation/winstonLogger");

/**
 * MySQL connection
 */
const mysqlConn = require("../api/mysqlConn");

/**
 * MySQL Queries
 */
const insertErrorQuery = `INSERT INTO logs
						SET
							message = ?,
							level= "error",
							timestamp=NOW(),
							origin=?
						`;
const getErrorsQuery = `SELECT * from logs
						WHERE timestamp >= ? and timestamp <= ? AND level = "error"`;

const insertInfoQuery = `INSERT INTO logs
						SET
						message=?,
						level="info",
						timestamp=NOW(),
						origin=?
						`;

const getInfosQuery = `SELECT * from logs
					  WHERE timestamp >= ? and timestamp <= ? AND level = "info"`;

const getAllQuery = `SELECT * from logs WHERE timestamp >= ? and timestamp <= ?`;
/**
 * Router Endpoints
 */

router.post("/log-error", async (req, res) => {
  let message = JSON.stringify(req.body.message);
  let origin = req.body.origin;

  await mysqlConn.query(insertErrorQuery, [message, origin]).then(rs => {
    if (rs[0].insertId > 0) {
      res.status(200).json();
    } else {
      res.status(500).json();
      logger.error("Logger failed to store message in DB");
    }
  });

  logger.error(message);
});

router.post("/log-info", async (req, res) => {
  let message = JSON.stringify(req.body.message);
  let origin = req.body.origin;

  await mysqlConn
    .query(insertInfoQuery, [message, origin])
    .then(rs => {
      if (rs[0].insertId > 0) {
        res.status(200).json();
      } else {
        res.status(500).json();
        logger.error("Logger failed to store message in DB");
      }
    })
    .catch(err => {
      console.log(err);
      logger.error("Logger failed to store message in DB");
    });

  logger.info(message);
});

router.get("/log-info/:from/:to", async (req, res) => {
  const startDate = moment(req.params.from).format(mysqlFormat);
  const endDate = moment(req.params.to).format(mysqlFormat);

  await mysqlConn
    .query(getInfosQuery, [startDate, endDate])
    .then(rs => {
      res.status(200).json(rs[0]);
    })
    .catch(err => console.log(err));
});

router.get("/logs/:from/:to", async (req, res) => {
  const startDate = moment(req.params.from).format(mysqlFormat);
  const endDate = moment(req.params.to).format(mysqlFormat);
  
  await mysqlConn
    .query(getAllQuery, [startDate, endDate])
    .then(rs => {
      res.status(200).json(rs[0]);
    })
    .catch(err => console.log(err));
});

router.get("/log-error/:from/:to", async (req, res) => {
  const startDate = moment(req.params.from).format(mysqlFormat);
  const endDate = moment(req.params.to).format(mysqlFormat);

  await mysqlConn
    .query(getErrorsQuery, [startDate, endDate])
    .then(rs => {
      res.status(200).json(rs[0]);
    })
    .catch(err => console.log(err));
});

/**
 * Export the configured router
 */

module.exports = router;
