<br />

server/.env
```
PORT = 8800

MYSQL_HOST = 127.0.0.1
MYSQL_USERNAME = root
MYSQL_PASSWORD = 비빌번호
MYSQL_DB = 데이터베이스
MYSQL_LIMIT = 10

MY_OCR_API_URL = OCR url
MY_OCR_SECRET_KEY = OCR 키

MY_OPENAI_API_KEY = 오픈 키

S3_ACCESS_KEY = S3 에세스 키
S3_SECRET_KEY = S3 시크릿 키

EXPORT_TAG_COUNT = 2
```

<br />

client/.env
```
GOOGLE_CLIENT_ID = 구글 클라이언트 아이디
GOOGLE_CLIENT_SECRET = 구글 클라이언트 시크릿
```

<br />
서버 실행

```
cd server
npx nodemon
```

<br />
클라이언트 실행

```
cd client
npm run dev
```

<br />
클라이언트 db.json 실행

```
cd client
npx json-server ./db.json --port 4000
```

<br />
ERD <br />

![2023-06-20_2 23 58](https://github.com/insight-LINK/insightLINK/assets/50854903/e8ac7096-acfd-4d47-b10b-acd52fa784cb)

<br />
로그인 기능 <br />
 - google 소셜 로그인 <br />
 - JWT Access Token (Chrom - [Application] - [Loal Storage] - [ https://localhost:3000/] - token 확인 가능)<br />
 - 서버 Session Management <br />