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
 * UUID
 */
const uuidGen = require('uuid/v4')
/**
 * MySQL connection
 */
const mysqlConn = require("../api/mysqlConn");

/**
 * MySQL Queries
 */

const getAllQuery = `SELECT * from logs WHERE timestamp >= ? and timestamp <= ?`;

const getAllTypeQuery = `SELECT * from logs WHERE timestamp >= ? and timestamp <= ? and level = ?`

const insertLog = `INSERT INTO logs
						SET
						message=?,
						level=?,
						timestamp=NOW(),
						origin=?,
						uuid=?
						`;
/**
 * Router Endpoints
 */
router.post("/log", async (req, res) => {
	let message = JSON.stringify(req.body.message)
	let origin = req.body.origin
	let uuid = uuidGen().replace(/-/g, '')
	let type = req.body.type
	await mysqlConn.query(insertLog, [message, type, origin, uuid]).then(rs => {
		if (rs[0].insertId > 0) {
			res.status(200).json(uuid)
		}
		else {
			res.status(500).json();
			logger.error(`Logger failed to store message ${message} of type ${type} with uuid ${uuid}`)
		}
	})
	logger.info(message)
})


router.get("/logs/:type/:from/:to", async (req, res) => {
	const startDate = moment(req.params.from).format(mysqlFormat);
	const endDate = moment(req.params.to).format(mysqlFormat);
	const type = req.params.type
	if (type === 'all') {
		await mysqlConn
			.query(getAllQuery, [startDate, endDate])
			.then(rs => {
				res.status(200).json(rs[0]);
			})
			.catch(err => console.log(err));
	}
	if (type !== 'all') {
		await mysqlConn
			.query(getAllTypeQuery, [startDate, endDate, type])
			.then(rs => {
				res.status(200).json(rs[0]);
			})
			.catch(err => console.log(err)); I
	}

});


/**
 * Export the configured router
 */

module.exports = router;
