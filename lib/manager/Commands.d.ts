import { AuthManager } from '../AuthManager';
import { Base } from '../Base';
import { CustomCommandData, CustomCommandResponse, Scopes, UserLevel, DefaultCommandResponse, GetDefaultCommandsResponse } from '../api-types/index';
/**
 * Class for managing commands.
 */
export declare class CommandsManager extends Base {
    _auth: AuthManager;
    constructor(auth: AuthManager);
    /**
     * Gets the current API user's custom commands list.
     *
     *  {@link https://api-docs.nightbot.tv/#get-custom-commands API Docs}
     */
    getCustomCommandsByMe(): Promise<CustomCommandData[]>;
    /**
     * Looks up a custom command by id.
     * @param id - ID of the command to looks up.
     * @returns Returns null if the command for the ID does not exist.
     *
     *  {@link https://api-docs.nightbot.tv/#get-custom-command-by-id API Docs}
     */
    getCustomCommmandById(id: string): Promise<CustomCommandResponse | null>;
    /**
     * Adds a new custom command to the current user's channel.
     * @param coolDown - default: 0
     * @param userLevel - default: everyone
     *
     * {@link https://api-docs.nightbot.tv/#add-new-custom-command API Docs}
     */
    addCustomCommand(name: string, message: string, coolDown?: number, userLevel?: UserLevel): Promise<CustomCommandResponse>;
    /**
     * Edits a custom command by its id.
     * @param id
     * @param options
     * @returns Returns null if the command for the ID does not exist.
     *
     * {@link https://api-docs.nightbot.tv/#edit-custom-command-by-id API Docs}
     */
    editCustomCommand(id: string, options: EditCustomCommandOptions): Promise<CustomCommandResponse | null>;
    /**
     * Deletes a custom command by id.
     * @param id
     *
     * {@link https://api-docs.nightbot.tv/#delete-custom-command-by-id API Docs}
     */
    deleteCustomCommand(id: string): Promise<void>;
    /**
     * Gets the current API user's default commands list.
     *
     * {@link https://api-docs.nightbot.tv/#get-default-commands API Docs}
     */
    getDefaultCommands(): Promise<GetDefaultCommandsResponse>;
    /**
     * Looks up a default command by name.
     * @param name - Name of the command to looks up. It's a unique name without prefix.
     * @returns - Returns null if the command for the name does not exist.
     *
     * {@link https://api-docs.nightbot.tv/#get-default-command-by-name API Docs}
     */
    getDefaultCommandByName(name: string): Promise<DefaultCommandResponse | null>;
    /**
     * Edits a default command by its name.
     * @param name - Name of the command to looks up. It's a unique name without prefix.
     * @param options
     * @returns - Returns null if the command for the name does not exist.
     *
     * {@link https://api-docs.nightbot.tv/#edit-default-command-by-name API Docs}
     */
    editDefaultCommand(name: string, options: EditDefaultCommandPotions): Promise<DefaultCommandResponse | null>;
    isScopesEnough(requiredScopes: Scopes[] | null): void;
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
export interface EditDefaultCommandPotions {
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
