const winston = require("winston");
const appRoot = require("app-root-path");

const logConfiguration = {
  transports: [
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
