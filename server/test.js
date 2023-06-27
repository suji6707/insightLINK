
const urls = [
  'https://sw-jungle-s3.s3.ap-northeast-2.amazonaws.com/1687583115333.picture4.jpg',
  'https://sw-jungle-s3.s3.ap-northeast-2.amazonaws.com/1687583115358.picture5.jpg',
  'https://sw-jungle-s3.s3.ap-northeast-2.amazonaws.com/1687583115362.picture6.jpg',
];

const promises = [];

const start = Date.now();

for (let i = 0; i < 1000; i++) {
  promises.push(fetch('http://127.0.0.1:8800/api/dummy', {
    headers: {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4NzUyNTM2MX0.nlOMVZWH7r9KVIcVnjYqXxLUFmgd4Qwaw5VbxXQPH34',
      'content-type': 'application/json',
      'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'Referer': 'http://127.0.0.1:3000/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    body: JSON.stringify(urls),
    method: 'POST',
  }));
}

Promise.all(promises)
  .then((responses) => {
    const millis = Date.now() - start;
    console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
    // Process responses here
    console.log('success: ' + responses.length);
  })
  .catch((error) => {
    console.log(error);
    console.log('failed');
  });