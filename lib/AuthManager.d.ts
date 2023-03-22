import { Base } from './Base';
import { Scopes } from './api-types/index';
import { AxiosRequestConfig } from 'axios';
/**
 * Class for authentication.
 */
export declare class AuthManager extends Base {
    _clientId: string;
    _clientSecret: string;
    _redirectUri: string;
    _accessToken: string;
    _refreshToken: string;
    _scopes: Scopes[] | null;
    onRefresh: ((info: TokenInfo) => {}) | null;
    constructor(authManagerOpt: {
        clientInfo: ClientInfo;
        tokenInfo: TokenInfo;
    });
    isExpired(): Promise<boolean>;
    /**
     * Refreshing Token.
     * @param force - Force refresh or not, default false.
     */
    refresh(force?: boolean): Promise<void>;
    generateReqConfig(): AxiosRequestConfig;
    _generateBearerToken(): string;
    _convertToken(type: 'Bearer' | null, token: string): string;
}
/**
 * {@link https://api-docs.nightbot.tv/#authorization-code-flow API Docs}
 */
export interface ClientInfo {
    /**
     * The client ID of the app.
     */
    clientId: string;
    /**
     * The client secret of the app.
     */
    clientSecret: string;
    /**
     * One of the redirect URIs listed for the app.
     */
    redirectUri: string;
}
/**
 * {@link https://api-docs.nightbot.tv/#authorization-code-flow API Docs}
 */
export interface TokenInfo {
    /**
     * The token that can be sent to the Nightbot API.
     */
    accessToken: string;
    /**
     * A token that may be used to obtain a new access token.
     */
    refreshToken: string;
    /**
     * This should be identical to scopes requested during authorization.
     */
    scopes?: Scopes[];
    onRefresh?: (info: TokenInfo) => {};
}
