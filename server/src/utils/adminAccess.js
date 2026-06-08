const getAdminEmails = () => {
    const raw = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || '';
    return raw
        .split(',')
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);
};

const isAdminEmail = (email) => {
    if (!email) return false;
    return getAdminEmails().includes(String(email).trim().toLowerCase());
};

module.exports = { getAdminEmails, isAdminEmail };
