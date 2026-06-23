/** Display stored reminder time as 12-hour clock (avoids "20:00 PM"). */
export const formatReminderTime = (reminderTime, reminderAmPm) => {
    if (!reminderTime) return null;

    const [rawH, rawM] = reminderTime.split(':').map(Number);
    if (!Number.isFinite(rawH)) return reminderTime;

    let hour = rawH;
    let ap = reminderAmPm || 'AM';

    if (hour >= 13) {
        ap = 'PM';
        hour = hour % 12 || 12;
    } else if (hour === 12) {
        ap = reminderAmPm === 'AM' ? 'AM' : 'PM';
        hour = 12;
    } else if (hour === 0) {
        hour = 12;
        ap = 'AM';
    } else if (!reminderAmPm && hour < 12) {
        ap = 'AM';
    }

    const minute = Number.isFinite(rawM) ? String(rawM).padStart(2, '0') : '00';
    return `${hour}:${minute} ${ap}`;
};
