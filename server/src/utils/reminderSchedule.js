const DEFAULT_TIMEZONE = process.env.REMINDER_TIMEZONE || 'Asia/Kolkata';

const pad2 = (n) => String(n).padStart(2, '0');

const hasReminderTime = (user) =>
    Boolean(user?.reminderTime && /^\d{1,2}:\d{2}$/.test(user.reminderTime));

/** Convert stored reminderTime + reminderAmPm to 24-hour parts. */
const to24HourParts = (reminderTime, reminderAmPm = 'AM') => {
    if (!reminderTime) {
        return null;
    }
    const [rawH, rawM] = reminderTime.split(':').map(Number);
    let hour = Number.isFinite(rawH) ? rawH : 20;
    const minute = Number.isFinite(rawM) ? rawM : 0;

    // <input type="time"> and normalized DB values use 24-hour (13–23).
    if (hour >= 13) {
        return { hour, minute };
    }

    if (reminderAmPm === 'PM') {
        if (hour !== 12) hour += 12;
    } else if (hour === 12) {
        hour = 0;
    }

    return { hour, minute };
};

/** Persist a single canonical 24h time string + matching AM/PM for the UI. */
const normalizeReminderStorage = (reminderTime, reminderAmPm = 'AM') => {
    const parts = to24HourParts(reminderTime, reminderAmPm);
    if (!parts) {
        return { reminderTime: undefined, reminderAmPm: undefined };
    }
    const { hour, minute } = parts;
    const reminderTime24 = `${pad2(hour)}:${pad2(minute)}`;
    const amPm = hour >= 12 ? 'PM' : 'AM';
    return { reminderTime: reminderTime24, reminderAmPm: amPm };
};

const getLocalNow = (timezone = DEFAULT_TIMEZONE) => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const parts = formatter.formatToParts(now);
    const get = (type) => parts.find((p) => p.type === type)?.value;

    let hour = Number(get('hour'));
    if (hour === 24) hour = 0;

    return {
        hour,
        minute: Number(get('minute')),
        dateKey: `${get('year')}-${get('month')}-${get('day')}`,
        timezone,
    };
};

const getLocalDateKey = (date, timezone = DEFAULT_TIMEZONE) =>
    new Intl.DateTimeFormat('en-CA', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date);

const minutesSinceMidnight = (hour, minute) => hour * 60 + minute;

/** True once local clock has reached the user's preferred reminder time today. */
const isReminderDue = (user, localNow = getLocalNow()) => {
    if (!hasReminderTime(user)) {
        return false;
    }
    const parts = to24HourParts(user.reminderTime, user.reminderAmPm);
    if (!parts) {
        return false;
    }
    const { hour, minute } = parts;
    const preferred = minutesSinceMidnight(hour, minute);
    const current = minutesSinceMidnight(localNow.hour, localNow.minute);
    return current >= preferred;
};

const wasReminderSentToday = (user, localNow = getLocalNow()) => {
    if (user?.lastReminderDateKey === localNow.dateKey) {
        return true;
    }
    if (!user?.lastReminderSent) {
        return false;
    }
    return getLocalDateKey(user.lastReminderSent, localNow.timezone) === localNow.dateKey;
};

/** Clear reminder send markers (e.g. when user changes reminder time). */
const clearReminderSendMarkers = () => ({
    lastReminderSent: undefined,
    lastReminderDateKey: undefined,
});

module.exports = {
    DEFAULT_TIMEZONE,
    hasReminderTime,
    to24HourParts,
    normalizeReminderStorage,
    getLocalNow,
    getLocalDateKey,
    isReminderDue,
    wasReminderSentToday,
    clearReminderSendMarkers,
};
