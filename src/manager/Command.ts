import { AuthManager } from '../AuthManager';
import { Base } from '../Base';
import { getErrorMessageFromAPIRes, checkForEnoughScopes } from '../utils/index';
import {
    APIEndPoints,
    GetCommandsResponse,
    CustomCommandData,
    CustomCommandResponse,
    UserLevel,
    DefaultCommandResponse,
    GetDefaultCommandsResponse,
} from '../api-types/index';
import { APIError } from '../Error';

/**
 * Class for managing commands.
 */
export class CommandManager extends Base {
    private auth: AuthManager;

    constructor(auth: AuthManager) {
        super();
        this.auth = auth;
    }

    /**
     * Gets the current API user's custom commands list.
     *
     *  {@link https://api-docs.nightbot.tv/#get-custom-commands API Docs}
     */
    async getCustomCommandsByMe(): Promise<CustomCommandData[]> {
        await this.auth.refresh();
        checkForEnoughScopes(this.auth, APIEndPoints.getCommands.requiredScopes);
        const res = await this.req.get({
            url: APIEndPoints.getCommands.endPoint,
            config: this.auth.generateReqConfig(),
        });
        if (res.status !== 200) throw new APIError(getErrorMessageFromAPIRes(res));
        const data: GetCommandsResponse = res.data;
        return data.commands;
    }

    /**
     * Looks up a custom command by id.
     * @param id - ID of the command to looks up.
     * @returns Returns null if the command for the ID does not exist.
     *
     *  {@link https://api-docs.nightbot.tv/#get-custom-command-by-id API Docs}
     */
    async getCustomCommmandById(id: string): Promise<CustomCommandResponse | null> {
        await this.auth.refresh();
        checkForEnoughScopes(this.auth, APIEndPoints.getCommandById.requiredScopes);
        const res = await this.req.get({
            url: `/1/commands/${id}`,
            config: this.auth.generateReqConfig(),
        });
        if (res.status === 404) return null;
        if (res.status === 200) return res.data;
        throw new APIError(getErrorMessageFromAPIRes(res));
    }

    /**
     * Adds a new custom command to the current user's channel.
     * @param coolDown - default: 0
     * @param userLevel - default: everyone
     *
     * {@link https://api-docs.nightbot.tv/#add-new-custom-command API Docs}
     */
    async addCustomCommand(
        name: string,
        message: string,
        coolDown?: number,
        userLevel?: UserLevel
    ): Promise<CustomCommandResponse> {
        await this.auth.refresh();
        checkForEnoughScopes(this.auth, APIEndPoints.addCommand.requiredScopes);
        coolDown = coolDown ?? 0;
        userLevel = userLevel ?? 'everyone';
        const res = await this.req.post({
            url: APIEndPoints.addCommand.endPoint,
            body: new URLSearchParams({
                name,
                message,
                coolDown: coolDown.toString(),
                userLevel: userLevel,
            }),
            config: this.auth.generateReqConfig(),
        });
        if (res.status === 200) return res.data;
        throw new APIError(getErrorMessageFromAPIRes(res));
    }

    /**
     * Edits a custom command by its id.
     * @param id
     * @param options
     * @returns Returns null if the command for the ID does not exist.
     *
     * {@link https://api-docs.nightbot.tv/#edit-custom-command-by-id API Docs}
     */
    async editCustomCommand(id: string, options: EditCustomCommandOptions): Promise<CustomCommandResponse | null> {
        await this.auth.refresh();
        checkForEnoughScopes(this.auth, APIEndPoints.editCommand.requiredScopes);
        const res = await this.req.put({
            url: `/1/commands/${id}`,
            body: {
                name: options.name,
                message: options.message,
                coolDown: options.coolDown,
                count: options.count,
                userLevel: options.userLevel,
            },
            config: this.auth.generateReqConfig(),
        });
        if (res.status === 200) return res.data;
        if (res.status === 404) return null;
        throw new APIError(getErrorMessageFromAPIRes(res));
    }

    /**
     * Deletes a custom command by id.
     * @param id
     *
     * {@link https://api-docs.nightbot.tv/#delete-custom-command-by-id API Docs}
     */
    async deleteCustomCommand(id: string) {
        await this.auth.refresh();
        checkForEnoughScopes(this.auth, APIEndPoints.deleteCommand.requiredScopes);
        const res = await this.req.delete({
            url: `/1/commands/${id}`,
            config: this.auth.generateReqConfig(),
        });
        if (res.status === 200) return;
        throw new APIError(getErrorMessageFromAPIRes(res));
    }

    /**
     * Gets the current API user's default commands list.
     *
     * {@link https://api-docs.nightbot.tv/#get-default-commands API Docs}
     */
    async getDefaultCommands(): Promise<GetDefaultCommandsResponse> {
        await this.auth.refresh();
        checkForEnoughScopes(this.auth, APIEndPoints.getDefaultCommands.requiredScopes);
        const res = await this.req.get({
            url: APIEndPoints.getDefaultCommands.endPoint,
            config: this.auth.generateReqConfig(),
        });
        if (res.status === 200) return res.data;
        throw new APIError(getErrorMessageFromAPIRes(res));
    }

    /**
     * Looks up a default command by name.
     * @param name - Name of the command to looks up. It's a unique name without prefix.
     * @returns - Returns null if the command for the name does not exist.
     *
     * {@link https://api-docs.nightbot.tv/#get-default-command-by-name API Docs}
     */
    async getDefaultCommandByName(name: string): Promise<DefaultCommandResponse | null> {
        await this.auth.refresh();
        checkForEnoughScopes(this.auth, APIEndPoints.getDefaultCommandByName.requiredScopes);
        const res = await this.req.get({
            url: `/1/commands/default/${name}`,
            config: this.auth.generateReqConfig(),
        });
        if (res.status === 404) return null;
        if (res.status === 200) return res.data;
        throw new APIError(getErrorMessageFromAPIRes(res));
    }

    /**
     * Edits a default command by its name.
     * @param name - Name of the command to looks up. It's a unique name without prefix.
     * @param options
     * @returns - Returns null if the command for the name does not exist.
     *
     * {@link https://api-docs.nightbot.tv/#edit-default-command-by-name API Docs}
     */
    async editDefaultCommand(name: string, options: EditDefaultCommandOptions): Promise<DefaultCommandResponse | null> {
        await this.auth.refresh();
        checkForEnoughScopes(this.auth, APIEndPoints.editDefaultCommand.requiredScopes);
        const res = await this.req.put({
            url: `/1/commands/default/${name}`,
            body: {
                coolDown: options.coolDown,
                enabled: options.enabled,
                userLevel: options.userLevel,
            },
            config: this.auth.generateReqConfig(),
        });
        if (res.status === 200) return res.data;
        if (res.status === 404) return null;
        throw new APIError(getErrorMessageFromAPIRes(res));
    }
}

export interface EditCustomCommandOptions {
    /**
     * The command name (usually prefixed with a !, but any prefix [or none] can be used).
     */
    name?: string;

    /**
     * The message to send to chat. It can contain [variables](https://docs.nightbot.tv/commands/variableslist) for extra functionality. Maximum length: 400 characters
     */
    message?: string;

    /**
     * The minimum amount of seconds between command usage (prevents spam).
     */
    coolDown?: number;

    /**
     * The number of times a command has been used (only increments if the command uses the count variable).
     */
    count?: number;

    /**
     * The userlevel required to use the command.
     */
    userLevel?: Exclude<UserLevel, 'admin'>;
}

export interface EditDefaultCommandOptions {
    /**
     * The minimum amount of seconds between command usage (prevents spam).
     */
    coolDown?: number;

    /**
     * The status of the default command. If `true`, command is enabled. If `false`, the command is disabled and is nonfunctional.
     */
    enabled?: boolean;

    /**
     * The [userlevel](https://api-docs.nightbot.tv/#userlevels) required to use the command.
     */
    userLevel?: Exclude<UserLevel, 'admin'>;
}
