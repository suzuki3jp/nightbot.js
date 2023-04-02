export declare const APIEndPoints: {
    getMe: EndPointData;
    refreshToken: EndPointData;
    getChannelByMe: EndPointData;
    joinChannel: EndPointData;
    partChannel: EndPointData;
    sendMessage: EndPointData;
    getCommands: EndPointData;
    getCommandById: EndPointData;
    addCommand: EndPointData;
    editCommand: EndPointData;
    deleteCommand: EndPointData;
    getDefaultCommands: EndPointData;
    getDefaultCommandByName: EndPointData;
    editDefaultCommand: EndPointData;
};
interface EndPointData {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    endPoint: string;
    requiredScopes: Scopes[] | null;
}
export interface ErrorResponse {
    status: number;
    message: string;
}
export { GetChannelResponse, ChannelData } from './channels';
export { GetCommandsResponse, CustomCommandData, CustomCommandResponse, GetDefaultCommandsResponse, DefaultCommandResponse, DefaultCommandData, } from './commands';
export { GetMeResponse } from './me';
import { Scopes } from './oauth';
export { Scopes, RefreshTokenResponse } from './oauth';
export { UserLevel } from './userLevel';
