export const APIEndPoints: {
    getMe: EndPointData;
    refreshToken: EndPointData;
    getCommands: EndPointData;
    getCommandById: EndPointData;
    getDefaultCommands: EndPointData;
    getDefaultCommandByName: EndPointData;
} = {
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
    getCommands: {
        method: 'GET',
        endPoint: '/1/commands',
        requiredScopes: ['commands'],
    },
    getCommandById: {
        method: 'GET',
        endPoint: '/1/commands/:id',
        requiredScopes: ['commands'],
    },
    getDefaultCommands: {
        method: 'GET',
        endPoint: '/1/commands/default',
        requiredScopes: ['commands_default'],
    },
    getDefaultCommandByName: {
        method: 'GET',
        endPoint: '/1/commands/default/:name',
        requiredScopes: ['commands_default'],
    },
};

interface EndPointData {
    method: 'GET' | 'POST';
    endPoint: string;
    requiredScopes: Scopes[] | null;
}

export interface ErrorResponse {
    status: number;
    message: string;
}

export { GetCommandsResponse, CustomCommandData } from './commands';

export { GetMeResponse } from './me';

import { Scopes } from './oauth';
export { Scopes, RefreshTokenResponse } from './oauth';

export { UserLevel } from './userLevel';
