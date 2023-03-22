import { UserLevel } from './index';

export interface GetCommandsResponse {
    _total: number;
    status: number;
    commands: CustomCommandData[];
}

export interface CustomCommandResponse {
    status: number;
    command: CustomCommandData;
}

export interface GetDefaultCommandsResponse {
    _total: number;
    status: number;
    commands: DefaultCommandData[];
}

export interface DefaultCommandResponse {
    status: number;
    command: DefaultCommandData;
}

/**
 * {@link https://api-docs.nightbot.tv/#default-command-resource API Docs}
 */
export interface DefaultCommandData {
    /**
     * The command's unique name.
     */
    _name: string;

    _description: string;

    _docs: string;

    /**
     * The minimum amount of seconds between command usage (prevents spam).
     */
    coolDown: number;

    /**
     * The status of the default command. If true, command is enabled. If false, the command is disabled and is nonfunctional.
     */
    enabled: boolean;

    /**
     * The command name (usually prefixed with a !, but any prefix [or none] can be used).
     */
    name: string;

    /**
     * The userlevel required to use the command.
     */
    userLevel: UserLevel;
}

export interface CustomCommandData {
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
