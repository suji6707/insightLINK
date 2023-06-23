export const screenshotSubjects_en = [
  'Internet Memes',
  'Conversation with Friends',
  'Online Tips or Information',
  'App Usage',
  'Saved Webpages',
  'Social Media Posts',
  'Online Shopping',
  'Mobile Game Achievements',
  'Food Orders',
  'Movie/Drama List',
  'Social Media Trends',
  'Online Ideas or Projects',
  'Website Errors',
  'Study Materials',
  'Online Learning',
  'Music Playlist',
  'App/Website Issues',
  'Online News',
  'Video Scenes',
  'Digital Art',
  'Online Recipe',
  'Travel Plans',
  'Online Advertising',
  'Voting Results',
  'Digital Creations',
  'Web Design Ideas',
  'Checklist',
  'Programming Code',
  'Sports Results',
  'Contact Information',
  'Profile Picture',
  'Reservation Confirmation',
  'Workout Routine',
  'Video Subtitles',
  'Password Reset',
  'Unique Website Design',
  'Cryptocurrency/Stock Price',
  'Weather Forecast',
  'Idea Brainstorming',
  'Animation',
];
  
export const screenshotSubjects_kr = [
  '인터넷 밈',
  '친구와의 대화',
  '온라인 팁 또는 정보',
  '앱 사용',
  '저장된 웹페이지',
  '소셜 미디어 게시물',
  '온라인 쇼핑',
  '모바일 게임 성과',
  '음식 주문',
  '영화/드라마 목록',
  '소셜 미디어 트렌드',
  '온라인 아이디어 또는 프로젝트',
  '웹사이트 오류',
  '학습 자료',
  '온라인 학습',
  '음악 재생목록',
  '앱/웹사이트 문제',
  '온라인 뉴스',
  '비디오 장면',
  '디지털 아트',
  '온라인 레시피',
  '여행 계획',
  '온라인 광고',
  '투표 결과',
  '디지털 작품',
  '웹 디자인 아이디어',
  '체크리스트',
  '프로그래밍 코드',
  '스포츠 결과',
  '연락처 정보',
  '프로필 사진',
  '예약 확인',
  '운동 루틴',
  '비디오 자막',
  '비밀번호 재설정',
  '독특한 웹사이트 디자인',
  '암호화폐/주식 가격',
  '날씨 예보',
  '아이디어 브레인스토밍',
  '애니메이션',
];


export const combinedList = screenshotSubjects_en.map((subject, index) => {
  return {
    index: index + 1, // Adding 1 to match 1-based indexing
    englishKeyword: subject,
    koreanKeyword: screenshotSubjects_kr[index],
  };
});
// console.log(combinedList);


export const mappedObject = screenshotSubjects_en.reduce((obj, subject, index) => {
  if (screenshotSubjects_en.length == screenshotSubjects_kr.length) {
    obj[subject] = screenshotSubjects_kr[index];
    return obj;
  }
  console.log('영/한 리스트의 길이가 일치하지 않습니다.');
  return null;
}, {});

export const countTags = () => screenshotSubjects_en.length;

export const convertToPlainText = () => {
  let plainText = '';
  const array = screenshotSubjects_en;
  for (let i = 0; i < array.length; i++) {
    plainText += `"${array[i]}"`;
    if (i === array.length - 2) {
      plainText += ' and ';
    } else if (i !== array.length - 1) {
      plainText += ',';
    }
  }
  return plainText;
};

// module.exports = {
//   screenshotSubjects_en,
//   screenshotSubjects_kr,
//   mappedObject,
//   countTags,
//   convertToPlainText,
// };