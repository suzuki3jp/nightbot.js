"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForEnoughScopes = void 0;
const Error_1 = require("../Error");
const checkForEnoughScopes = (auth, requiredScopes) => {
    if (!requiredScopes)
        return;
    const includedScopes = requiredScopes.filter((scope) => auth._scopes?.includes(scope));
    if (requiredScopes.length === includedScopes.length)
        return;
    throw new Error_1.APIError('Missing Scopes. required Scopes: ' + requiredScopes?.toString());
};
exports.checkForEnoughScopes = checkForEnoughScopes;
//# sourceMappingURL=scopes.js.map