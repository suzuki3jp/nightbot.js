"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessageFromAPIRes = void 0;
const getErrorMessageFromAPIRes = (res) => {
    if (res.data.message)
        return res.data.message;
    if (res.data.error_description)
        return res.data.error_description;
    return 'unknown api error';
};
exports.getErrorMessageFromAPIRes = getErrorMessageFromAPIRes;
//# sourceMappingURL=error.js.map