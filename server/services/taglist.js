// export const combinedList = screenshotSubjects_en.map((subject, index) => {
//   return {
//     index: index + 1, // Adding 1 to match 1-based indexing
//     englishKeyword: subject,
//     koreanKeyword: screenshotSubjects_kr[index],
//   };
// });
// console.log(combinedList);


// export const mappedObject = screenshotSubjects_en.reduce((obj, subject, index) => {
//   if (screenshotSubjects_en.length == screenshotSubjects_kr.length) {
//     obj[subject] = screenshotSubjects_kr[index];
//     return obj;
//   }
//   console.log('영/한 리스트의 길이가 일치하지 않습니다.');
//   return null;
// }, {});

// export const countTags = () => screenshotSubjects_en.length;


// module.exports = {
//   screenshotSubjects_en,
//   screenshotSubjects_kr,
//   mappedObject,
//   countTags,
//   convertToPlainText,
// };