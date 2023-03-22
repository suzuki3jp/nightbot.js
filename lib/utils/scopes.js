"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIncludeRequiedScopes = void 0;
const isIncludeRequiedScopes = (auth, requiredScopes) => {
    if (!requiredScopes)
        return true;
    const includedScopes = requiredScopes.filter((scope) => auth._scopes?.includes(scope));
    if (requiredScopes.length === includedScopes.length)
        return true;
    return false;
};
exports.isIncludeRequiedScopes = isIncludeRequiedScopes;
//# sourceMappingURL=scopes.js.map