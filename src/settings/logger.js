const pino = require('pino');

const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translate: true,
      translateTime: 'SYS:standard',
      encoding: 'utf8',
    },
  },
});

module.exports = logger;
