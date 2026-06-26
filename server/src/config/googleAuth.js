const { OAuth2Client } = require('google-auth-library');

const FALLBACK_CLIENT_ID =
    '937868886257-sgoqf4onr843odrv2518eghvog3ppm97.apps.googleusercontent.com';

/** All client IDs that may issue tokens for this app (local + production). */
const isValidClientId = (id) =>
    typeof id === 'string' && /\.apps\.googleusercontent\.com$/.test(id.trim());

const getGoogleClientIds = () => {
    const ids = [
        process.env.GOOGLE_CLIENT_ID,
        process.env.VITE_GOOGLE_CLIENT_ID,
        FALLBACK_CLIENT_ID,
    ].filter(isValidClientId);

    return [...new Set(ids)];
};

const getPrimaryClientId = () => getGoogleClientIds()[0] || FALLBACK_CLIENT_ID;

const oauthClient = new OAuth2Client();

const verifyGoogleCredential = async (credential) => {
    const audiences = getGoogleClientIds();
    const ticket = await oauthClient.verifyIdToken({
        idToken: credential,
        audience: audiences.length === 1 ? audiences[0] : audiences,
    });
    return ticket.getPayload();
};

const getOAuthClient = () => {
    const clientId = getPrimaryClientId();
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();

    if (!clientSecret || clientSecret.includes('YOUR_GOOGLE')) {
        throw new Error(
            'GOOGLE_CLIENT_SECRET is not configured on the server. Set it in Render → Environment.'
        );
    }

    return new OAuth2Client(clientId, clientSecret);
};

/** Exchange OAuth auth-code (popup flow) for a verified Google profile. */
const verifyGoogleAuthCode = async (code, redirectUri) => {
    if (!redirectUri?.trim()) {
        throw new Error('Missing redirect URI for Google sign-in.');
    }

    const client = getOAuthClient();
    const { tokens } = await client.getToken({
        code,
        redirect_uri: redirectUri.trim(),
    });

    if (!tokens.id_token) {
        throw new Error('Google did not return an ID token.');
    }

    const ticket = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: getPrimaryClientId(),
    });

    return ticket.getPayload();
};

module.exports = {
    getGoogleClientIds,
    getPrimaryClientId,
    verifyGoogleCredential,
    verifyGoogleAuthCode,
    FALLBACK_CLIENT_ID,
};
