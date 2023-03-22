import { AuthManager } from '../AuthManager';
import { Scopes } from '../api-types/index';
export declare const isIncludeRequiedScopes: (auth: AuthManager, requiredScopes: Scopes[] | null) => boolean;
