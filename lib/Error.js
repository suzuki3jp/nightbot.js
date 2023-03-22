"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
class APIError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NightBotAPIError';
    }
}
exports.APIError = APIError;
//# sourceMappingURL=Error.js.map