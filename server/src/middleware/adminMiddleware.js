const asyncHandler = require('express-async-handler');
const { isAdminEmail } = require('../utils/adminAccess');

const admin = asyncHandler(async (req, res, next) => {
    if (!isAdminEmail(req.user?.email)) {
        res.status(403);
        throw new Error('Admin access required');
    }
    next();
});

module.exports = { admin };
