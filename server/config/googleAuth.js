const { OAuth2Client } = require('google-auth-library');

const FALLBACK_CLIENT_ID =
    '937868886257-sgoqf4onr843odrv2518eghvog3ppm97.apps.googleusercontent.com';

/** All client IDs that may issue tokens for this app (local + production). */
const getGoogleClientIds = () => {
    const ids = [
        process.env.GOOGLE_CLIENT_ID,
        process.env.VITE_GOOGLE_CLIENT_ID,
        FALLBACK_CLIENT_ID,
    ].filter(Boolean);

    return [...new Set(ids)];
};

const oauthClient = new OAuth2Client();

const verifyGoogleCredential = async (credential) => {
    const audiences = getGoogleClientIds();
    const ticket = await oauthClient.verifyIdToken({
        idToken: credential,
        audience: audiences.length === 1 ? audiences[0] : audiences,
    });
    return ticket.getPayload();
};

module.exports = {
    getGoogleClientIds,
    verifyGoogleCredential,
    FALLBACK_CLIENT_ID,
};
