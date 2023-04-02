"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
const Base_1 = require("../Base");
const index_1 = require("../utils/index");
const index_2 = require("../api-types/index");
const Error_1 = require("../Error");
/**
 * Class for managing commands.
 */
class CommandManager extends Base_1.Base {
    auth;
    constructor(auth) {
        super();
        this.auth = auth;
    }
    /**
     * Gets the current API user's custom commands list.
     *
     *  {@link https://api-docs.nightbot.tv/#get-custom-commands API Docs}
     */
    async getCustomCommandsByMe() {
        await this.auth.refresh();
        (0, index_1.checkForEnoughScopes)(this.auth, index_2.APIEndPoints.getCommands.requiredScopes);
        const res = await this.req.get({
            url: index_2.APIEndPoints.getCommands.endPoint,
            config: this.auth.generateReqConfig(),
        });
        if (res.status !== 200)
            throw new Error_1.APIError((0, index_1.getErrorMessageFromAPIRes)(res));
        const data = res.data;
        return data.commands;
    }
    /**
     * Looks up a custom command by id.
     * @param id - ID of the command to looks up.
     * @returns Returns null if the command for the ID does not exist.
     *
     *  {@link https://api-docs.nightbot.tv/#get-custom-command-by-id API Docs}
     */
    async getCustomCommmandById(id) {
        await this.auth.refresh();
        (0, index_1.checkForEnoughScopes)(this.auth, index_2.APIEndPoints.getCommandById.requiredScopes);
        const res = await this.req.get({
            url: `/1/commands/${id}`,
            config: this.auth.generateReqConfig(),
        });
        if (res.status === 404)
            return null;
        if (res.status === 200)
            return res.data;
        throw new Error_1.APIError((0, index_1.getErrorMessageFromAPIRes)(res));
    }
    /**
     * Adds a new custom command to the current user's channel.
     * @param coolDown - default: 0
     * @param userLevel - default: everyone
     *
     * {@link https://api-docs.nightbot.tv/#add-new-custom-command API Docs}
     */
    async addCustomCommand(name, message, coolDown, userLevel) {
        await this.auth.refresh();
        (0, index_1.checkForEnoughScopes)(this.auth, index_2.APIEndPoints.addCommand.requiredScopes);
        coolDown = coolDown ?? 0;
        userLevel = userLevel ?? 'everyone';
        const res = await this.req.post({
            url: index_2.APIEndPoints.addCommand.endPoint,
            body: new URLSearchParams({
                name,
                message,
                coolDown: coolDown.toString(),
                userLevel: userLevel,
            }),
            config: this.auth.generateReqConfig(),
        });
        if (res.status === 200)
            return res.data;
        throw new Error_1.APIError((0, index_1.getErrorMessageFromAPIRes)(res));
    }
    /**
     * Edits a custom command by its id.
     * @param id
     * @param options
     * @returns Returns null if the command for the ID does not exist.
     *
     * {@link https://api-docs.nightbot.tv/#edit-custom-command-by-id API Docs}
     */
    async editCustomCommand(id, options) {
        await this.auth.refresh();
        (0, index_1.checkForEnoughScopes)(this.auth, index_2.APIEndPoints.editCommand.requiredScopes);
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
        if (res.status === 200)
            return res.data;
        if (res.status === 404)
            return null;
        throw new Error_1.APIError((0, index_1.getErrorMessageFromAPIRes)(res));
    }
    /**
     * Deletes a custom command by id.
     * @param id
     *
     * {@link https://api-docs.nightbot.tv/#delete-custom-command-by-id API Docs}
     */
    async deleteCustomCommand(id) {
        await this.auth.refresh();
        (0, index_1.checkForEnoughScopes)(this.auth, index_2.APIEndPoints.deleteCommand.requiredScopes);
        const res = await this.req.delete({
            url: `/1/commands/${id}`,
            config: this.auth.generateReqConfig(),
        });
        if (res.status === 200)
            return;
        throw new Error_1.APIError((0, index_1.getErrorMessageFromAPIRes)(res));
    }
    /**
     * Gets the current API user's default commands list.
     *
     * {@link https://api-docs.nightbot.tv/#get-default-commands API Docs}
     */
    async getDefaultCommands() {
        await this.auth.refresh();
        (0, index_1.checkForEnoughScopes)(this.auth, index_2.APIEndPoints.getDefaultCommands.requiredScopes);
        const res = await this.req.get({
            url: index_2.APIEndPoints.getDefaultCommands.endPoint,
            config: this.auth.generateReqConfig(),
        });
        if (res.status === 200)
            return res.data;
        throw new Error_1.APIError((0, index_1.getErrorMessageFromAPIRes)(res));
    }
    /**
     * Looks up a default command by name.
     * @param name - Name of the command to looks up. It's a unique name without prefix.
     * @returns - Returns null if the command for the name does not exist.
     *
     * {@link https://api-docs.nightbot.tv/#get-default-command-by-name API Docs}
     */
    async getDefaultCommandByName(name) {
        await this.auth.refresh();
        (0, index_1.checkForEnoughScopes)(this.auth, index_2.APIEndPoints.getDefaultCommandByName.requiredScopes);
        const res = await this.req.get({
            url: `/1/commands/default/${name}`,
            config: this.auth.generateReqConfig(),
        });
        if (res.status === 404)
            return null;
        if (res.status === 200)
            return res.data;
        throw new Error_1.APIError((0, index_1.getErrorMessageFromAPIRes)(res));
    }
    /**
     * Edits a default command by its name.
     * @param name - Name of the command to looks up. It's a unique name without prefix.
     * @param options
     * @returns - Returns null if the command for the name does not exist.
     *
     * {@link https://api-docs.nightbot.tv/#edit-default-command-by-name API Docs}
     */
    async editDefaultCommand(name, options) {
        await this.auth.refresh();
        (0, index_1.checkForEnoughScopes)(this.auth, index_2.APIEndPoints.editDefaultCommand.requiredScopes);
        const res = await this.req.put({
            url: `/1/commands/default/${name}`,
            body: {
                coolDown: options.coolDown,
                enabled: options.enabled,
                userLevel: options.userLevel,
            },
            config: this.auth.generateReqConfig(),
        });
        if (res.status === 200)
            return res.data;
        if (res.status === 404)
            return null;
        throw new Error_1.APIError((0, index_1.getErrorMessageFromAPIRes)(res));
    }
}
exports.CommandManager = CommandManager;
//# sourceMappingURL=Command.js.map