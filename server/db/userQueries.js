export const userInfoQuery = (userId) => { 
  return `select User.user_name AS userName ,COUNT(File.user_id)AS cardCnt from User,File where User.user_id = File.user_id AND User.user_id = ${userId} GROUP BY User.user_name;`;
};

export const userProfileQuery = (userId) => {
  return `SELECT profile_img,user_name FROM User where User.user_id = ${userId};`;
};

export const myInfoQuery = (userId) => {
  return `SELECT user_name,email,profile_img FROM User where user_id = ${userId};`;
};

export const followCntQuery = (userId) => {
  return `select COUNT(*) AS cnt from Follow where user_id = ${userId};`;
};

export const tagCntQuery = (userId) => {
  return `SELECT COUNT(DISTINCT tag) AS tag_count
  FROM Tag
  WHERE file_id IN (
      SELECT file_id
      FROM File
      WHERE user_id = ${userId}
  );`;
}
