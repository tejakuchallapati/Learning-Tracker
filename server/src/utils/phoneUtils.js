/** Normalize Indian mobile numbers to E.164 (+91XXXXXXXXXX). */
const normalizePhone = (raw) => {
    if (!raw) return null;
    const digits = String(raw).replace(/\D/g, '');

    if (digits.length === 10) {
        return `+91${digits}`;
    }
    if (digits.length === 12 && digits.startsWith('91')) {
        return `+${digits}`;
    }
    if (digits.length === 13 && digits.startsWith('91')) {
        return `+${digits}`;
    }

    return null;
};

const maskPhone = (phone) => {
    if (!phone || phone.length < 8) return phone;
    return `${phone.slice(0, 3)}******${phone.slice(-2)}`;
};

module.exports = { normalizePhone, maskPhone };
