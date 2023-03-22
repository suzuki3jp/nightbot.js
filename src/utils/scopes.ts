import { AuthManager } from '../AuthManager';
import { Scopes } from '../api-types/index';

export const isIncludeRequiedScopes = (auth: AuthManager, requiredScopes: Scopes[] | null): boolean => {
    if (!requiredScopes) return true;
    const includedScopes = requiredScopes.filter((scope) => auth._scopes?.includes(scope));
    if (requiredScopes.length === includedScopes.length) return true;
    return false;
};
