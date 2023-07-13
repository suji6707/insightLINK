<br/><br/>

# InsightLINK
### 갤러리속 스크린샷에서 인사이트를 발견하세요!
<br/><br/>

![insightLINK_README](https://github.com/suji6707/insightLINK/assets/111227732/1009b031-ecc5-405f-932d-6d05e499acf7)

<br/>

### 스마트폰에 방치된 수십, 수백개의 스크린샷을 올려보세요.<br/>
### 자동으로 태그가 추출하여 공통된 사진끼리 연결되어 그래프로 시각화하여 볼 수 있습니다.<br/>
### 편집모드를 눌러 노드를 합치거나 간선 연결/제거, 태그를 수정할 수 있습니다.<br/>
### 소셜 페이지에서는 친구들의 카드를 구경하고, 다른 사람 그래프를 조회하며 
### 마음에 드는 카드를 내 그래프로 가져와 인사이트를 확장하세요.

<br/><br/>

# Table of contents
### - Major Functions
### - Project Architecture
### - Technologies used
### - Getting started

<br/>

# Major Functions
### - 사진 업로드시 태그 생성
### - 그래프 시각화
### - 소셜 피드 (친구/카드 추천)
### - 팔로우 및 공유/알람
### - 다른 유저 그래프 조회
### - 카드 복제, 내 그래프로 가져오기

<br/>

![image](https://github.com/suji6707/insightLINK/assets/111227732/78e62b54-13e5-4b71-ae24-ccf33513c218)


<br/>

# Project Architecture
### 사진 업로드 >> OCR >> 태그 추출 >> 그래프 연산 
<br/>

![image](https://github.com/suji6707/insightLINK/assets/111227732/912defb4-8d7b-4611-a24a-a5a1e2d4a8e5)


<br/>

# Technologies Used
<p align="center"><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"><img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"><img src="https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"><img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"><img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=black"><img src="https://img.shields.io/badge/redis-red?style=for-the-badge&logo=redis&logoColor=black"></p>
<p align="center"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/next.js-black?style=for-the-badge&logo=next.js&logoColor=white"><img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white"><img src="https://img.shields.io/badge/vercel-black?style=for-the-badge&logo=vercel&logoColor=white"></p>

<br/>

|백엔드 기술 스택|사용 이유|
|------|------|
|Node.js|사진 업로드나 외부 API 데이터 송수신 등 I/O 집중적인 서비스 특성상, Node.js의 비동기 이벤트 드리븐 런타임은 I/O 비동기 처리를 효율적으로 수행 가능. 또한 대부분의 데이터를 JSON으로 처리하고 있어(사진 및 태그정보, 레디스, 그래프연산 등) JSON 데이터를 자연스럽게 다룰 수 있는 Node.js 채택|
|AWS EC2/S3|서버와 데이터베이스를 EC2에서 운영. 서비스 확장시 AMI 이미지를 복제하여 VPC 서브넷으로 연결. 이미지 업로드시 파일은 S3에 저장, EC2 데이터베이스에는 image url만 저장|
|MySQL|관계도 매핑이 많고 소셜피드 쿼리가 복잡하여, 속도가 빠르고 안정성이 높은 MySQL 사용|
|Nginx|Nginx 웹서버를 리버스 프록시로 활용하여 로드밸런싱으로 트래픽 분산|
|Redis|태그리스트 저장시 ioredis 활용. 또한 Producer/Consumer 메커니즘을 이용한 비동기 처리에서 레디스 큐 활용. 레디스는 프로세스간 메모리 공유를 지원한다는 장점이 있어 분산처리에 적합|

<br/>

# Getting Started
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

EXPORT_TAG_COUNT = 2
```
client/.env
```
S3_ACCESS_KEY = S3 에세스 키
S3_SECRET_KEY = S3 시크릿 키

SOURCE_URL = http://localhost:8800/api/:path*
```
서버 실행
```
cd server
npx nodemon
```
클라이언트 실행
```
cd client
npm run dev
```

