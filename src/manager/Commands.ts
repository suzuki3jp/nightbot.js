import { AuthManager } from '../AuthManager';
import { Base } from '../Base';
import { getErrorMessageFromAPIRes, isIncludeRequiedScopes } from '../utils/index';
import {
    APIEndPoints,
    GetCommandsResponse,
    CustomCommandData,
    CustomCommandResponse,
    Scopes,
    UserLevel,
    GetDefaultCommandByNameResponse,
    GetDefaultCommandsResponse,
} from '../api-types/index';
import { APIError } from '../Error';

export class CommandsManager extends Base {
    _auth: AuthManager;

    constructor(auth: AuthManager) {
        super();
        this._auth = auth;
    }

    /**
     * Gets the current API user's custom commands list.
     *
     *  {@link https://api-docs.nightbot.tv/#get-custom-commands API Docs}
     */
    async getCustomCommandsByMe(): Promise<CustomCommandData[]> {
        await this._auth.refresh();
        this.isScopesEnough(APIEndPoints.getCommands.requiredScopes);
        const res = await this.req.get({
            url: APIEndPoints.getCommands.endPoint,
            config: this._auth.generateReqConfig(),
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
        await this._auth.refresh();
        this.isScopesEnough(APIEndPoints.getCommandById.requiredScopes);
        const res = await this.req.get({
            url: `/1/commands/${id}`,
            config: this._auth.generateReqConfig(),
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
        await this._auth.refresh();
        this.isScopesEnough(APIEndPoints.addCommand.requiredScopes);
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
            config: this._auth.generateReqConfig(),
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
        await this._auth.refresh();
        this.isScopesEnough(APIEndPoints.editCommand.requiredScopes);
        const res = await this.req.put({
            url: `/1/commands/${id}`,
            body: {
                name: options.name,
                message: options.message,
                coolDown: options.coolDown,
                count: options.count,
                userLevel: options.userLevel,
            },
            config: this._auth.generateReqConfig(),
        });
        if (res.status === 200) return res.data;
        if (res.status === 404) return null;
        throw new APIError(getErrorMessageFromAPIRes(res));
    }

    /**
     * Deletes a custom command by id.
     * @param id
     */
    async deleteCustomCommand(id: string) {
        await this._auth.refresh();
        this.isScopesEnough(APIEndPoints.deleteCommand.requiredScopes);
        const res = await this.req.delete({
            url: `/1/commands/${id}`,
            config: this._auth.generateReqConfig(),
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
        await this._auth.refresh();
        this.isScopesEnough(APIEndPoints.getDefaultCommands.requiredScopes);
        const res = await this.req.get({
            url: APIEndPoints.getDefaultCommands.endPoint,
            config: this._auth.generateReqConfig(),
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
    async getDefaultCommandByName(name: string): Promise<GetDefaultCommandByNameResponse | null> {
        await this._auth.refresh();
        this.isScopesEnough(APIEndPoints.getDefaultCommandByName.requiredScopes);
        const res = await this.req.get({
            url: `/1/commands/default/${name}`,
            config: this._auth.generateReqConfig(),
        });
        if (res.status === 404) return null;
        if (res.status === 200) return res.data;
        throw new APIError(getErrorMessageFromAPIRes(res));
    }

    isScopesEnough(requiredScopes: Scopes[] | null) {
        if (!isIncludeRequiedScopes(this._auth, requiredScopes)) {
            throw new APIError('Missing Scopes. required Scopes: ' + requiredScopes?.toString());
        } else return;
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
    userLevel?: UserLevel;
}
