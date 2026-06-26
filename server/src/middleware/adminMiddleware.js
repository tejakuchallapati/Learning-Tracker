const asyncHandler = require('express-async-handler');
const { isAdminUser } = require('../utils/adminAccess');

const admin = asyncHandler(async (req, res, next) => {
    if (!isAdminUser(req.user)) {
        res.status(403);
        throw new Error('Not authorized as admin');
    }
    next();
});

module.exports = admin;
