import winston from 'winston';
import config from '../config';

const transports = [];
const isSilence = process.env.NODE_ENV === 'production' ? true : undefined;

if (process.env.NODE_ENV !== 'development') {
   transports.push(new winston.transports.Console());
} else {
   transports.push(
      new winston.transports.Console({
         format: winston.format.combine(winston.format.cli(), winston.format.splat()),
      })
   );
}

const loggerInstance = winston.createLogger({
   level: config.log.level,
   levels: winston.config.npm.levels,
   silent: isSilence,
   format: winston.format.combine(
      winston.format.timestamp({
         format: 'YYYY-MM-DD HH-mm-ss',
      }),
      winston.format.errors({
         stack: true,
      }),
      winston.format.splat(),
      winston.format.json()
   ),
   transports,
});

export default loggerInstance;
