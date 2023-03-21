import { AuthManager } from '../AuthManager';
import { Base } from '../Base';
import { getErrorMessageFromAPIRes, isIncludeRequiedScopes } from '../utils/index';
import { APIEndPoints, GetCommandsResponse, CustomCommandData, Scopes } from '../api-types/index';
import { APIError } from '../Error';
import {
    GetCommandByIdResponse,
    GetDefaultCommandByNameResponse,
    GetDefaultCommandsResponse,
} from '../api-types/commands';

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
    async getCustomCommmandById(id: string): Promise<GetCommandByIdResponse | null> {
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
