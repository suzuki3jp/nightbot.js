import { AuthManager } from '../AuthManager';
import { Base } from '../Base';
import { getErrorMessageFromAPIRes, isIncludeRequiedScopes } from '../utils/index';
import { APIEndPoints, GetCommandsResponse, CommandData, Scopes } from '../api-types/index';
import { APIError } from '../Error';
import { GetCommandByIdResponse } from '../api-types/commands';

export class CommandsManager extends Base {
    _auth: AuthManager;

    constructor(auth: AuthManager) {
        super();
        this._auth = auth;
    }

    /**
     * Gets the current API user's custom commands list.
     */
    async getCustomCommandsByMe(): Promise<CommandData[]> {
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
     * @returns - Returns null if the command with ID does not exist.
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

    isScopesEnough(requiredScopes: Scopes[] | null) {
        if (!isIncludeRequiedScopes(this._auth, requiredScopes)) {
            throw new APIError('Missing Scopes. required Scopes: ' + requiredScopes?.toString());
        } else return;
    }
}
