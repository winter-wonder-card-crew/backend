/**
 * Swagger를 사용하여 API 문서를 생성하기 위한 설정
 * 
 * swaggerJSDoc: swagger-jsdoc 모듈
 * options: Swagger 설정 옵션 객체
 *   - openapi: OpenAPI 버전 (3.0.0)
 *   - info: API 정보
 *     - title: API 제목 ('Winter-wonder-crew API')
 *     - version: API 버전 ('1.0.0')
 *     - description: API 설명 ('winterwonder API')
 *   - host: API 호스트 ('localhost:8080')
 *   - basePath: API 기본 경로 ('/'): 실 사용 주소( http://localhost:8080/api-docs/ ) app.js에 정의되어 있음.
 *   - apis: API 문서를 생성할 대상 파일 경로들 (라우터 및 스웨거 설정 파일 등)
 * 
 * specs: Swagger 문서 객체
 */

const swaggerJSDoc = require('swagger-jsdoc')

// Swagger 설정 옵션 객체
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'winterwonder API',
      version: '1.0.0',
      description: 'winterwonder API',
    },
    host: 'localhost:3000',
    basePath: '/'
  },
  apis: ['./routers/*', './swagger/*', './app.js'] // API 문서를 생성할 대상 파일 경로들
};

const specs = swaggerJSDoc(options); // Swagger 문서 객체 생성

module.exports = { specs };