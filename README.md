<br />

server/.env
```
PORT = 8800

MYSQL_HOST = 127.0.0.1
MYSQL_USERNAME = root
MYSQL_PASSWORD = 비빌번호
MYSQL_DB = 데이터베이스
MYSQL_PORT = 3306
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
로그인 기능 <br />
 - google 소셜 로그인 <br />
 - JWT Access Token (Chrom - [Application] - [Loal Storage] - [ https://localhost:3000/] - token 확인 가능)<br />
 - 서버 Session Management <br />