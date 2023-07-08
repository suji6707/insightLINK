/*************************** 태그 간선 제거  ************************/
// export const findTagQuery = 
// `SELECT DISTINCT t1.file_id
//   FROM Tag t1
//   JOIN Tag t2 ON t1.file_id = t2.file_id
//   JOIN File f1 ON t1.file_id = f1.file_id
//   JOIN File f2 ON t2.file_id = f2.file_id
//   WHERE t1.tag = ? AND t2.tag = ? 
//     AND f1.user_id = ? AND f2.user_id = ?`;

export const existQuery =
`select count(*) as count 
  from Tag
  where tag = ? and file_id = ?`;

export const disconnQuery = 
`delete from Tag
  where file_id = ? and tag = ?`;

/*************************** 태그 간선 연결  ************************/

export const findToConnQuery = 
`SELECT Tag.file_id
  FROM Tag
  JOIN File ON Tag.file_id = File.file_id
  WHERE Tag.tag = ?
    AND File.user_id = ?`;

export const findTobeConnQuery = 
`SELECT tag_index
  FROM taglist
  WHERE koreanKeyword = ? AND user_id = ?`; 

export const tagInsertQuery = 
`INSERT INTO Tag (file_id, tag, tag_index)
  VALUES (?, ?, ?)`;


/*************************** 태그 수정  ************************/

export const chgtaglistQuery = 
`UPDATE taglist
  SET taglist.koreanKeyword = ?
  WHERE taglist.koreanKeyword = ? AND user_id = ?`;

export const chgTagQuery = 
`UPDATE Tag
  JOIN taglist ON Tag.tag_index = taglist.tag_index
  SET Tag.tag = ?
  WHERE taglist.koreanKeyword = ? AND taglist.user_id = ?`;