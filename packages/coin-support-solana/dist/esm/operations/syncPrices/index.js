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
import { createSyncPricesObservable } from '@cypherock/coin-support-utils';
import { getCoinIds } from '../../utils';
export var syncPrices = function (params) {
    return createSyncPricesObservable(__assign(__assign({}, params), { getCoinIds: getCoinIds }));
};
