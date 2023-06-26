export const userInfoQuery = (userId) => { 
  return `SELECT U.user_name AS userName, COUNT(DISTINCT T.tag_id) AS tagCnt, COUNT(DISTINCT F.file_id) AS cardCnt
        FROM User U
        LEFT JOIN File F ON U.user_id = F.user_id
        LEFT JOIN Tag T ON F.file_id = T.file_id
        WHERE U.user_id = ${userId}
        GROUP BY U.user_id, U.user_name;`;
};

export const userProfileQuery = (userId) => {
  return `SELECT profile_img,user_name FROM User where User.user_id = ${userId};`;
};

export const myInfoQuery = (userId) => {
  return `SELECT user_name,email,profile_img FROM User where user_id = ${userId};`;
};

