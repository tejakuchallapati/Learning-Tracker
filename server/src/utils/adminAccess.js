const getAdminEmails = () => {
    const raw = process.env.ADMIN_EMAIL || '';
    return raw
        .split(',')
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);
};

const isAdminUser = (user) => {
    if (!user) return false;
    const emails = getAdminEmails();
    if (!emails.length) return false;
    const loginEmail = user.email?.trim().toLowerCase();
    const reminderEmail = user.reminderEmail?.trim().toLowerCase();
    return Boolean(
        (loginEmail && emails.includes(loginEmail)) ||
        (reminderEmail && emails.includes(reminderEmail))
    );
};

module.exports = { getAdminEmails, isAdminUser };
