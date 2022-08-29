import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({maxsize: 5242880, filename: "logs/logger.log" }),
    new winston.transports.File({maxsize: 5242880, filename: "logs/warn.log", level: "warn" }),
    new winston.transports.File({maxsize: 5242880, filename: "logs/error.log", level: "error" }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.prettyPrint()
  ),
});

export default logger;
