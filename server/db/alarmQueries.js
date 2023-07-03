export const deleteAlarmQuery = (userId) => {
    return `DELETE FROM Alarm WHERE following_id = ${userId};`
}

export const AlarmQuery = (following_id) => {
    return `SELECT alarm_content AS \`case\`,user_name AS sender from Alarm,User where User.user_id = Alarm.user_id and following_id = ${following_id};`
}

export const InsertAlarmQuery = (userId,following_id,alarm_content) => {
    return `INSERT into Alarm(alarm_content,user_id,following_id) values('${alarm_content}',${userId},${following_id})`;
}