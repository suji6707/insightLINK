
export const followAddQuery = 
'INSERT INTO Follow (user_id, following_id) VALUES (?, ?)';

export const followDeleteQuery = 
'DELETE FROM Follow WHERE user_id =? AND following_id = ?';

/* 친구 여부 체크 */
export const followCheckQuery = 
`SELECT COUNT(*) as count 
  FROM Follow 
  WHERE user_id = ? AND following_id = ?`;

/* 친구 조회 */
export const findFollowQuery = 
`SELECT following_id
  FROM Follow
  WHERE user_id = ?`;

/* 최근 업로드한 카드 한 장 (LIMIT 조정) */
export const recentCardQuery = 
`SELECT File.file_id
  FROM File
  WHERE user_id = ?
  ORDER BY created_at DESC
  LIMIT 1`;