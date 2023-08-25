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
exports.syncPriceHistories = void 0;
var coin_support_utils_1 = require("@cypherock/coin-support-utils");
var utils_1 = require("../../utils");
var syncPriceHistories = function (params) {
    return (0, coin_support_utils_1.createSyncPriceHistoriesObservable)(__assign(__assign({}, params), { getCoinIds: utils_1.getCoinIds }));
};
exports.syncPriceHistories = syncPriceHistories;
