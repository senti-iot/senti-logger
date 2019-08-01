/**
 * Express Router for Endpoints
 */
const express = require("express");
const router = express.Router()

/**
 * Logger
 */
const logger = require("../currentImplementation/winstonLogger")

/**
 * Router Endpoints
 */

router.post("/log-error", (req, res) => {
	const message = req.body
	logger.error(message)
	/**
	 * We don't really need a JSON response,
	 * a status code of 200 OK is enough
	 * But as it is now it will respond with 200 OK even if it crashed
	 */
	res.status(200).json()
})

router.post("/log-info", (req, res) => {
	const message = req.body
	logger.info(message)
	res.status(200).json()
})

/**
 * Export the configured router
 */

module.exports = router