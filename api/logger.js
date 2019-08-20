/**
 * Express Router for Endpoints
 */
const express = require("express");
const router = express.Router();
// const appRoot = require("app-root-path");
// const fs = require("fs");
// const db = require("./database");
const moment = require('moment')
const mysqlFormat = 'YYYY-MM-DD HH:mm:ss'
/**
 * Logger
 */
const logger = require("../currentImplementation/winstonLogger");

/**
 * MySQL connection
 */
const mysqlConn = require("../api/mysqlConn")

/**
 * MySQL Queries
 */
const insertErrorQuery = `INSERT INTO logs
						SET
							message = ?,
							level= "error",
							timestamp=NOW()
						`
const getErrorsQuery = `SELECT * from logs
						WHERE timestamp >= ? and timestamp <= ? AND level = "error"`

const insertInfoQuery = `INSERT INTO logs
						SET
						message=?,
						level="info",
						timestamp=NOW()
						`

const getInfosQuery = `SELECT * from logs
					  WHERE timestamp >= ? and timestamp <= ? AND level = "info"`

/**
 * Router Endpoints
 */

router.post("/log-error", async (req, res) => {
	let message = JSON.stringify(req.body.message);

	// await db.execute("insert into logs SET message = ?, level = 'error'", [
	// 		JSON.stringify(message)
	// ]);

	await mysqlConn.query(insertErrorQuery, [message]).then(rs => {
		if (rs[0].insertId > 0) {
			res.status(200).json()
		}
		else {
			res.status(500).json()
			logger.error('Logger failed to store message in DB')
		}

	})
	// We still store the message on the files
	// res.status(200).json();
	logger.error(message);
});

router.post("/log-info", async (req, res) => {
	let message = JSON.stringify(req.body.message);
	// await db.execute("insert into logs SET message = ?, level = 'info'", [
	// 	JSON.stringify(message)
	// ]);
	await mysqlConn.query(insertInfoQuery, [message]).then(rs => {
		if (rs[0].insertId > 0) {
			res.status(200).json()
		}
		else {
			res.status(500).json()
			logger.error('Logger failed to store message in DB')
		}
	}).catch(err => {
		console.log(err)
		logger.error('Logger failed to store message in DB')

	})
	logger.info(message);
	// res.status(200).json();
});

router.get("/log-info/:from/:to", async (req, res) => {
	// const logs = await fs.readFile(`${appRoot}/logs/info.log`, (error, data) => {
	//   if (error) {
	//     return res.status(500).json({ msg: "No logs could be found!" });
	//   }

	//   const array = data.toString().split("\n");
	//   db.execute("select * from logs").then(ss => console.log(ss[0][0]));
	//   array.forEach(object => console.log(JSON.parse(object)));
	//   res.send(array);
	// });

	/**
	 * What if we have 2 milion logs dating from 4 years ago? Could a poor Intel i3 with 4gb RAM handle all of them?
	 * We need a filter, a date time one is perfect for this
	 */

	const startDate = moment(req.params.from).format(mysqlFormat)
	const endDate = moment(req.params.to).format(mysqlFormat)


	await mysqlConn.query(getInfosQuery, [startDate, endDate]).then(rs => {
		res.status(200).json(rs[0])
	}).catch(err => console.log(err))

	/**
	 * Unused variables are a no no...
	 */
	// const logs = await db
	// 	.query("select * from logs where level = 'info'")
	// 	.then(results => res.send(results[0]));
});

router.get("/log-error/:from/:to", async (req, res) => {

	const startDate = moment(req.params.from).format(mysqlFormat)
	const endDate = moment(req.params.to).format(mysqlFormat)


	await mysqlConn.query(getErrorsQuery, [startDate, endDate]).then(rs => {
		res.status(200).json(rs[0])
	}).catch(err => console.log(err))

	// const logs = await db
	// 	.query("select * from logs where level = 'error'")
	// 	.then(results => res.send(results[0]));
});

/**
 * Export the configured router
 */

module.exports = router;
