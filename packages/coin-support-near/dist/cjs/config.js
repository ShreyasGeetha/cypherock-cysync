"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var cysync_utils_1 = require("@cypherock/cysync-utils");
exports.config = {
    API_CYPHEROCK: (0, cysync_utils_1.getEnvVariable)('API_CYPHEROCK', 'https://api.cypherock.com'),
};
