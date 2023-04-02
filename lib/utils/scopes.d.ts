import { AuthManager } from '../AuthManager';
import { Scopes } from '../api-types/index';
export declare const checkForEnoughScopes: (auth: AuthManager, requiredScopes: Scopes[] | null) => void;
