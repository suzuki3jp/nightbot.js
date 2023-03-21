import { UserLevel } from './index';

export interface GetCommandsResponse {
    _total: number;
    status: number;
    commands: CommandData[];
}

export interface GetCommandByIdResponse {
    status: number;
    command: CommandData;
}

export interface CommandData {
    _id: string;
    alias?: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    message: string;
    coolDown: number;
    count: number;
    userLevel: UserLevel;
}
