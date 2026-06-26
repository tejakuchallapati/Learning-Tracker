const { normalizePhone } = require('./phoneUtils');

const getAdminPhones = () => {
    const raw = process.env.ADMIN_PHONE || '';
    return raw
        .split(',')
        .map((p) => normalizePhone(p.trim()))
        .filter(Boolean);
};

const getAdminEmails = () => {
    const raw = process.env.ADMIN_EMAIL || '';
    return raw
        .split(',')
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);
};

const isAdminUser = (user) => {
    if (!user) return false;
    const phones = getAdminPhones();
    if (phones.length && user.phone && phones.includes(user.phone)) {
        return true;
    }
    const emails = getAdminEmails();
    const reminderEmail = user.reminderEmail?.trim().toLowerCase();
    return Boolean(reminderEmail && emails.includes(reminderEmail));
};

module.exports = { getAdminPhones, getAdminEmails, isAdminUser };
