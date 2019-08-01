const winston = require("winston");
const appRoot = require("app-root-path");

const logConfiguration = {
	transports: [
		/**
		 * We need to also see live stuff so I've added a Console transport here...
		 */
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.printf((info) => {
					return `${info.timestamp} - [${info.level}]: ${JSON.stringify(info.message)}`;
				}))
		}),

		new winston.transports.File({
			level: "error",
			filename: `${appRoot}/logs/errors.log`,
			maxsize: 5242880,
			maxFiles: 5,
			colorize: false,
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json()
			)
		}),
		new winston.transports.File({
			level: "info",
			filename: `${appRoot}/logs/info.log`,
			maxsize: 5242880,
			maxFiles: 5,
			colorize: false,
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json()
			)
		})

	]
};

const logger = winston.createLogger(logConfiguration);

module.exports = logger;
