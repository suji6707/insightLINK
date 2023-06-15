export const searchContent = (keyword) => { 
    return `SELECT f.file_id, f.content, t.tag  
            FROM File f
            JOIN FileTag ft ON f.file_id = ft.file_id
            JOIN Tag t ON ft.tag_id = t.tag_id
            WHERE f.content LIKE '%${keyword}%'
            ORDER BY f.updated_at ASC;`;
  };
  

export const searchTag = (keyword) => {
    return `SELECT t.tag, f.content
            FROM Tag t
            JOIN File f ON t.file_id = f.file_id
            WHERE t.file_id IN (
                SELECT t.file_id
                FROM Tag t
                WHERE t.tag LIKE '%${keyword}%'
            )
            ORDER BY f.created_at DESC;`;
}