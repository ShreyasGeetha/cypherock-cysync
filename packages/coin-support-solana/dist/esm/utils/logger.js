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
import { createDefaultConsoleLogger, updateLoggerObject, } from '@cypherock/cysync-utils';
export var loggerServiceName = 'coin-support-solana';
var logger = __assign({}, createDefaultConsoleLogger(loggerServiceName));
export var updateLogger = function (createLogger) {
    updateLoggerObject({
        currentLogger: logger,
        newLogger: createLogger(loggerServiceName),
    });
};
export default logger;
