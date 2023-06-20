
export const followAddQuery = 
'INSERT INTO Follow (user_id, following_id) VALUES (?, ?)';

export const followDeleteQuery = 
'DELETE FROM Follow WHERE user_id =? AND following_id = ?';

export const followCheckQuery = 
`SELECT COUNT(*) as count 
  FROM Follow 
  WHERE user_id = ? AND following_id = ?`;