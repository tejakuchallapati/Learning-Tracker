const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeEmail = (raw) => {
    const email = String(raw || '').trim().toLowerCase();
    return EMAIL_RE.test(email) ? email : null;
};

const maskEmail = (email) => {
    if (!email || !email.includes('@')) return email;
    const [local, domain] = email.split('@');
    if (local.length <= 2) return `**@${domain}`;
    return `${local.slice(0, 2)}***@${domain}`;
};

module.exports = { normalizeEmail, maskEmail };
