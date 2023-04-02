"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelManager = void 0;
const Base_1 = require("../Base");
const index_1 = require("../api-types/index");
const index_2 = require("../utils/index");
const Error_1 = require("../Error");
class ChannelManager extends Base_1.Base {
    auth;
    constructor(auth) {
        super();
        this.auth = auth;
    }
    /**
     * Gets the current API user's channel information.
     *
     * {@link https://api-docs.nightbot.tv/#get-channel API Docs}
     */
    async getChannelByMe() {
        await this.auth.refresh();
        (0, index_2.checkForEnoughScopes)(this.auth, index_1.APIEndPoints.getChannelByMe.requiredScopes);
        const res = await this.req.get({
            url: index_1.APIEndPoints.getChannelByMe.endPoint,
            config: this.auth.generateReqConfig(),
        });
        if (res.status !== 200)
            throw new Error_1.APIError((0, index_2.getErrorMessageFromAPIRes)(res));
        const data = res.data;
        return data.channel;
    }
    /**
     * Makes Nightbot join(enter) the current user's channel.
     *
     * {@link https://api-docs.nightbot.tv/#join-channel API Docs}
     */
    async joinChannel() {
        await this.auth.refresh();
        (0, index_2.checkForEnoughScopes)(this.auth, index_1.APIEndPoints.joinChannel.requiredScopes);
        const res = await this.req.post({
            url: index_1.APIEndPoints.joinChannel.endPoint,
            config: this.auth.generateReqConfig(),
        });
        if (res.status !== 200)
            throw new Error_1.APIError((0, index_2.getErrorMessageFromAPIRes)(res));
        return;
    }
    /**
     * Makes Nightbot part(leave) the current user's channel.
     *
     * {@link https://api-docs.nightbot.tv/#part-channel API Docs}
     */
    async partChannel() {
        await this.auth.refresh();
        (0, index_2.checkForEnoughScopes)(this.auth, index_1.APIEndPoints.partChannel.requiredScopes);
        const res = await this.req.post({
            url: index_1.APIEndPoints.partChannel.endPoint,
            config: this.auth.generateReqConfig(),
        });
        if (res.status !== 200)
            throw new Error_1.APIError((0, index_2.getErrorMessageFromAPIRes)(res));
        return;
    }
    /**
     * Makes Nightbot send a message to the channel.
     * @param content - The message to send to chat. Maximum length: 400 characters.
     * @param chatId - The chat ID to send chat to. When not provided the message is sent to all chat rooms for this channel.
     *                 This is only useful for YouTube channels with multiple concurrent chat rooms.
     *
     * {@link https://api-docs.nightbot.tv/#send-channel-message API Docs}
     */
    async sendMessage(content, chatId) {
        await this.auth.refresh();
        (0, index_2.checkForEnoughScopes)(this.auth, index_1.APIEndPoints.sendMessage.requiredScopes);
        const body = { message: content };
        if (chatId)
            body.chatId = chatId;
        const res = await this.req.post({
            url: index_1.APIEndPoints.sendMessage.endPoint,
            body,
            config: this.auth.generateReqConfig(),
        });
        if (res.status !== 200)
            throw new Error_1.APIError((0, index_2.getErrorMessageFromAPIRes)(res));
        return;
    }
}
exports.ChannelManager = ChannelManager;
//# sourceMappingURL=Channel.js.map