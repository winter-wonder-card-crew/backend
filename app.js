const express = require('express');
const app = express();
const cors = require('cors');
const jennie = require('./routers/jennie');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// CORS 설정: 다른 도메인에서의 요청을 허용하기 위해 CORS 설정을 적용
app.use(cors());

// JSON 파싱 설정: 요청의 본문을 JSON 형식으로 파싱하여 사용할 수 있도록 함
app.use(express.json());

// dotenv 설정: 환경변수 로드를 위해 dotenv 설정을 적용
require('dotenv').config();

// Passport 초기화: Passport 초기화를 수행하여 사용자 인증을 설정함
const passport = require("passport"); // Passport 모듈
const passportConfig = require('./modules/passport/index.js'); // Passport 설정 파일
app.use(passport.initialize());

// Passport 설정: 사용자 로그인 및 인증 전략을 설정
passportConfig();

// Swagger 사용 설정: /api-docs 경로에 Swagger UI를 설정하여 API 문서를 표시함
const swaggerUi = require('swagger-ui-express');
const { specs } = require('./swagger/swagger.js');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// MongoDB 연결: MongoDB와 연결함
const conn = require('./db/connect/connect.js');
conn.MongoConnect();

// 라우터 설정
const accountRouter = require('./routers/account.js'); // 사용자 기능 설정
const passwordRouter = require('./routers/password.js'); // 사용자 기능(비밀번호 찾기 설정)
const routeHandler = require('./modules/errorHandler/routeHandler.js');

app.use(routeHandler);

app.use('/account', accountRouter);
app.use('/reset-password', passwordRouter);

// 웹 서버 시작: 8080 포트에서 웹 서버를 시작함
app.listen(8080, function() {
    console.log('8080 포트에서 서버가 실행 중입니다.');
});
