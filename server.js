#!/usr/bin/env nodejs

/**
 * Imports
 */
const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('./api/logger')

/**
 * Initialize Express server
 */

const app = express()

/**
 * Service Port
 */
const port = process.env.NODE_PORT || 3019

/**
 * Service Configuration
 * Helmet - Various security checks and functions for CORS and HTTP/S
 * json & urlencoded func - Request Parser for Express
 */

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

/**
 * Endpoints
 */

app.use([logger])

/**
 * Start the Express server
 */
const startServer = () => {
	app.listen(port, () => {
		console.log('Senti Service started on port', port)
	}).on('error', (err) => {
		if (err.errno === 'EADDRINUSE') {
			console.log('Service not started, port ' + port + ' is busy')
		} else {
			console.log(err)
		}
	})
}

startServer()
