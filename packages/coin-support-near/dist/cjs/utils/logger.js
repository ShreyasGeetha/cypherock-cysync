"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLogger = exports.loggerServiceName = void 0;
var cysync_utils_1 = require("@cypherock/cysync-utils");
exports.loggerServiceName = 'coin-support-near';
var logger = __assign({}, (0, cysync_utils_1.createDefaultConsoleLogger)(exports.loggerServiceName));
var updateLogger = function (createLogger) {
    (0, cysync_utils_1.updateLoggerObject)({
        currentLogger: logger,
        newLogger: createLogger(exports.loggerServiceName),
    });
};
exports.updateLogger = updateLogger;
exports.default = logger;
