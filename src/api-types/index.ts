export const APIEndPoints = {
    base: 'https://api.nightbot.tv',
    getMe: {
        method: 'GET',
        endPoint: '/1/me',
        requiredScopes: null,
    },
    refreshToken: {
        method: 'POST',
        endPoint: '/oauth2/token',
        requiredScopes: null,
    },
};
export interface ErrorResponse {
    status: number;
    message: string;
}

export { GetMeResponse } from './me';

export { Scopes, RefreshTokenResponse } from './oauth';
