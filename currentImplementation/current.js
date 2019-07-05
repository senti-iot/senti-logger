
// in server.js
const pino = require('pino')

const logRequests = require('./api/logging/logger')

const expressPino = require('express-pino-logger')({
	logger: pino()
})
app.use([expressPino])
app.use('/', logRequests)

module.exports.logger = pino(pino.destination(`/var/log/nodejs/databroker/${new Date().toLocaleDateString().replace(/\//g, '-')}-others.json`))


//* /api/logging/logger.js router to log all requests 

const express = require('express')
const router = express.Router()
const fileLogger = require('../../server').logger

router.all('*',(req, res, next) => {
	fileLogger.info(req)
	req.log.child={}
	res.log.info(req)
	next()
});


module.exports = router