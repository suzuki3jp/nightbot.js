import { AuthManager } from '../AuthManager';
import { APIError } from '../Error';
import { Scopes } from '../api-types/index';

export const checkForEnoughScopes = (auth: AuthManager, requiredScopes: Scopes[] | null) => {
    if (!requiredScopes) return;
    const includedScopes = requiredScopes.filter((scope) => auth._scopes?.includes(scope));
    if (requiredScopes.length === includedScopes.length) return;
    throw new APIError('Missing Scopes. required Scopes: ' + requiredScopes?.toString());
};
