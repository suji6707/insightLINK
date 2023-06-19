/* 카드 상세정보 */
export const cardInfoQuery = 
  `SELECT Tag.tag, File.img_url
    FROM Tag
    JOIN File ON Tag.file_id = File.file_id
    WHERE File.user_id = ? AND File.file_id = ?`;

/* Copying card from others */
export const copyQuery1 = 
  `INSERT INTO File (user_id, img_url, content)
    SELECT ?, img_url, content 
    FROM File
    WHERE file_id = ?`;

export const copyQuery2 = 
  `INSERT INTO Tag (file_id, tag, tag_index) 
    SELECT ?, tag, tag_index
    FROM Tag
    WHERE file_id = ?`; 