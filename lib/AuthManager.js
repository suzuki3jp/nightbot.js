"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthManager = void 0;
const Base_1 = require("./Base");
const Error_1 = require("./Error");
const index_1 = require("./api-types/index");
const index_2 = require("./utils/index");
/**
 * Class for authentication.
 */
class AuthManager extends Base_1.Base {
    _clientId;
    _clientSecret;
    _redirectUri;
    _accessToken;
    _refreshToken;
    _scopes;
    onRefresh;
    constructor(authManagerOpt) {
        super();
        this._clientId = authManagerOpt.clientInfo.clientId;
        this._clientSecret = authManagerOpt.clientInfo.clientSecret;
        this._redirectUri = authManagerOpt.clientInfo.redirectUri;
        this._accessToken = authManagerOpt.tokenInfo.accessToken;
        this._refreshToken = authManagerOpt.tokenInfo.refreshToken;
        this._scopes = authManagerOpt.tokenInfo.scopes ?? null;
        this.onRefresh = authManagerOpt.tokenInfo.onRefresh ?? null;
    }
    async isExpired() {
        const res = await this.req.get({
            url: index_1.APIEndPoints.getMe.endPoint,
            config: this.generateReqConfig(),
        });
        if (res.status !== 200)
            return true;
        const data = res.data;
        this._scopes = data.authorization.scopes;
        return false;
    }
    /**
     * Refreshing Token.
     * @param force - Force refresh or not, default false.
     */
    async refresh(force) {
        if (!force && !(await this.isExpired()))
            return;
        const res = await this.req.post({
            url: index_1.APIEndPoints.refreshToken.endPoint,
            body: new URLSearchParams({
                client_id: this._clientId,
                client_secret: this._clientSecret,
                grant_type: 'refresh_token',
                redirect_uri: this._redirectUri,
                refresh_token: this._convertToken(null, this._refreshToken),
            }),
        });
        if (res.status !== 200)
            throw new Error_1.APIError((0, index_2.getErrorMessageFromAPIRes)(res));
        const data = res.data;
        this._accessToken = data.access_token;
        this._refreshToken = data.refresh_token;
        // @ts-ignore
        this._scopes = data.scope.split(' ');
        if (!this.onRefresh)
            return;
        this.onRefresh({
            accessToken: this._accessToken,
            refreshToken: this._refreshToken,
            scopes: this._scopes ?? undefined,
            onRefresh: this.onRefresh,
        });
    }
    generateReqConfig() {
        return { headers: { authorization: this._generateBearerToken() } };
    }
    _generateBearerToken() {
        return this._convertToken('Bearer', this._accessToken);
    }
    _convertToken(type, token) {
        const bearerStr = 'Bearer ';
        if (!type) {
            if (token.startsWith(bearerStr))
                return token.slice(bearerStr.length);
            return token;
        }
        else {
            if (token.startsWith(bearerStr))
                return token;
            return `${bearerStr}${token}`;
        }
    }
}
exports.AuthManager = AuthManager;
//# sourceMappingURL=AuthManager.js.map