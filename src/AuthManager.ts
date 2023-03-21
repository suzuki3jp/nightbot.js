import { Base } from './Base';
import { APIError } from './Error';
import { APIEndPoints, GetMeResponse, RefreshTokenResponse, Scopes } from './api-types/index';
import { getErrorMessageFromAPIRes } from './utils/index';
import { AxiosRequestConfig } from 'axios';

export class AuthManager extends Base {
    public _clientId: string;
    public _clientSecret: string;
    public _redirectUri: string;
    public _accessToken: string;
    public _refreshToken: string;
    public _scopes: Scopes[] | null;
    public onRefresh: ((info: TokenInfo) => {}) | null;

    constructor(authManagerOpt: { clientInfo: ClientInfo; tokenInfo: TokenInfo }) {
        super();
        this._clientId = authManagerOpt.clientInfo.clientId;
        this._clientSecret = authManagerOpt.clientInfo.clientSecret;
        this._redirectUri = authManagerOpt.clientInfo.redirectUri;
        this._accessToken = authManagerOpt.tokenInfo.accessToken;
        this._refreshToken = authManagerOpt.tokenInfo.refreshToken;
        this._scopes = authManagerOpt.tokenInfo.scopes ?? null;
        this.onRefresh = authManagerOpt.tokenInfo.onRefresh ?? null;
    }

    async isExpired(): Promise<boolean> {
        const res = await this.req.get({
            url: APIEndPoints.getMe.endPoint,
            config: this.generateReqConfig(),
        });
        if (res.status !== 200) return true;
        const data: GetMeResponse = res.data;
        this._scopes = data.authorization.scopes;
        return false;
    }

    async refresh(options?: { force?: boolean }) {
        if (!options?.force && !(await this.isExpired())) return;
        const res = await this.req.post({
            url: APIEndPoints.refreshToken.endPoint,
            body: new URLSearchParams({
                client_id: this._clientId,
                client_secret: this._clientSecret,
                grant_type: 'refresh_token',
                redirect_uri: this._redirectUri,
                refresh_token: this._convertToken(null, this._refreshToken),
            }),
        });
        if (res.status !== 200) throw new APIError(getErrorMessageFromAPIRes(res));
        const data: RefreshTokenResponse = res.data;
        this._accessToken = data.access_token;
        this._refreshToken = data.refresh_token;
        // @ts-ignore
        this._scopes = data.scope.split(' ');
        if (!this.onRefresh) return;
        this.onRefresh({
            accessToken: this._accessToken,
            refreshToken: this._refreshToken,
            scopes: this._scopes ?? undefined,
            onRefresh: this.onRefresh,
        });
    }

    generateReqConfig(): AxiosRequestConfig {
        return { headers: { authorization: this._generateBearerToken() } };
    }

    _generateBearerToken() {
        return this._convertToken('Bearer', this._accessToken);
    }

    _convertToken(type: 'Bearer' | null, token: string): string {
        const bearerStr = 'Bearer ';
        if (!type) {
            if (token.startsWith(bearerStr)) return token.slice(bearerStr.length);
            return token;
        } else {
            if (token.startsWith(bearerStr)) return token;
            return `${bearerStr}${token}`;
        }
    }
}

export interface ClientInfo {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}

export interface TokenInfo {
    accessToken: string;
    refreshToken: string;
    scopes?: Scopes[];
    onRefresh?: (info: TokenInfo) => {};
}
