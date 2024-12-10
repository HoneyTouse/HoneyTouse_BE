require('./settings/setConsoleCodePage');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const passport = require('./passport/googleStrategy');
const cookieParser = require('cookie-parser');
const loader = require('./loader');
const config = require('./config');
const AppError = require('./misc/AppError');
const commonErrors = require('./misc/commonErrors');
const apiRouter = require('./router');
const cors = require('cors');
const allowedOrigins = require('./settings/corsOptions');
const logger = require('./settings/logger');
const pinoHttp = require('pino-http');

// express application을 "생성"해주는 함수
async function create() {
  // MongoDB에 연결
  await loader.load();

  logger.info('express application을 초기화합니다.');
  const expressApp = express();
  expressApp.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Request Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    }),
  );
  expressApp.use(express.json());
  expressApp.use(cookieParser());

  // Passport 초기화 및 세션 설정
  expressApp.use(passport.initialize());
  expressApp.use(pinoHttp({ logger }));

  // 정적파일 경로 설정
  expressApp.use(express.static(path.join(__dirname, 'public')));

  // Health check API
  expressApp.get('/health', (req, res) => {
    res.json({
      status: 'OK! ><',
    });
  });

  // version 1의 api router를 등록
  expressApp.use('/api/v1', apiRouter.v1);

  // Swagger 생성
  const file = fs.readFileSync(path.resolve(__dirname, 'swagger.yaml'), 'utf8');
  const swaggerDocument = YAML.parse(file);

  expressApp.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
  );

  // 해당되는 URL이 없을 때를 대비한 미들웨어
  expressApp.use((req, res, next) => {
    next(
      new AppError(
        commonErrors.resourceNotFoundError,
        'Resource not found',
        404,
      ),
    );
  });

  // 에러 핸들러 등록
  // eslint-disable-next-line
  expressApp.use((error, req, res, next) => {
    logger.error(
      {
        message: error.message,
        stack: error.stack || 'No stack trace available',
        url: req.originalUrl,
        method: req.method,
        headers: req.headers,
        body: req.body,
      },
      'Request Failed',
    );
    res.statusCode = error.httpCode ?? 500;
    res.json({
      data: null,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  });
  logger.info('express application 준비가 완료되었습니다.');

  // express와 http.Server을 분리해서 관리하기 위함.
  const server = http.createServer(expressApp);

  const app = {
    // 서버 어플리케이션을 시작하기 위한 메소드
    start() {
      server.listen(config.port);
      server.on('listening', () => {
        logger.info(
          `🚀${config.applicationName}가 포트 ${config.port}에서 운영중입니다.`,
        );
        logger.info(
          `📜${config.applicationName}의 REST API 문서는 /api-docs에서 확인 가능합니다.`,
        );
      });
    },

    // 서버 종료 전에 요청을 받지 않도록 하고, MongoDB 연결을 안전하게 종료하는 메소드
    async stop() {
      logger.info('🔥 서버를 중지 작업을 시작합니다.');
      this.isShuttingDown = true;
      await new Promise((resolve, reject) => {
        server.close(async (error) => {
          if (error !== undefined) {
            logger.error(
              { error },
              `- HTTP 서버 중지를 실패하였습니다: ${error.message}`,
            );
            reject(error);
          }
          logger.info('- 들어오는 커넥션을 더 이상 받지 않도록 하였습니다.');
          await loader.unload();
          logger.info('- DB 커넥션을 정상적으로 끊었습니다.');
          logger.info('🟢 서버 중지 작업을 성공적으로 마쳤습니다.');
          this.isShuttingDown = false;
          resolve();
        });
      });
    },
    isShuttingDown: false, // 서버가 중지하는 상태인지를 확인하는 플래그
    _app: expressApp,
  };

  return app;
}

module.exports = create;
