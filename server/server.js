const path = require('path');

// Legacy Render setups may still use rootDir: server. Boot the real app from backend/.
const backendRoot = path.join(__dirname, '..', 'backend');
process.chdir(backendRoot);
require(path.join(backendRoot, 'server.js'));
