"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIEndPoints = void 0;
exports.APIEndPoints = {
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
    getChannelByMe: {
        method: 'GET',
        endPoint: '/1/channel',
        requiredScopes: ['channel'],
    },
    joinChannel: {
        method: 'POST',
        endPoint: '/1/channel/join',
        requiredScopes: ['channel'],
    },
    partChannel: {
        method: 'POST',
        endPoint: '/1/channel/part',
        requiredScopes: ['channel'],
    },
    sendMessage: {
        method: 'POST',
        endPoint: '/1/channel/send',
        requiredScopes: ['channel_send'],
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
    addCommand: {
        method: 'POST',
        endPoint: '/1/commands',
        requiredScopes: ['commands'],
    },
    editCommand: {
        method: 'PUT',
        endPoint: '/1/commands/:id',
        requiredScopes: ['commands'],
    },
    deleteCommand: {
        method: 'DELETE',
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
    editDefaultCommand: {
        method: 'PUT',
        endPoint: '/1/commands/default/:name',
        requiredScopes: ['commands_default'],
    },
};
//# sourceMappingURL=index.js.map