import { AuthManager } from '../AuthManager';
import { Base } from '../Base';
import { APIEndPoints, ChannelData, GetChannelResponse, Scopes } from '../api-types/index';
import { getErrorMessageFromAPIRes, checkForEnoughScopes } from '../utils/index';
import { APIError } from '../Error';

export class ChannelsManager extends Base {
    private auth: AuthManager;

    constructor(auth: AuthManager) {
        super();
        this.auth = auth;
    }

    /**
     * Gets the current API user's channel information.
     *
     * {@link https://api-docs.nightbot.tv/#get-channel API Docs}
     */
    async getChannelByMe(): Promise<ChannelData> {
        await this.auth.refresh();
        checkForEnoughScopes(this.auth, APIEndPoints.getChannelByMe.requiredScopes);
        const res = await this.req.get({
            url: APIEndPoints.getChannelByMe.endPoint,
            config: this.auth.generateReqConfig(),
        });
        if (res.status !== 200) throw new APIError(getErrorMessageFromAPIRes(res));
        const data: GetChannelResponse = res.data;
        return data.channel;
    }

    /**
     * Makes Nightbot join(enter) the current user's channel.
     *
     * {@link https://api-docs.nightbot.tv/#join-channel API Docs}
     */
    async joinChannel(): Promise<void> {
        await this.auth.refresh();
        checkForEnoughScopes(this.auth, APIEndPoints.joinChannel.requiredScopes);
        const res = await this.req.post({
            url: APIEndPoints.joinChannel.endPoint,
            config: this.auth.generateReqConfig(),
        });
        if (res.status !== 200) throw new APIError(getErrorMessageFromAPIRes(res));
        return;
    }

    /**
     * Makes Nightbot part(leave) the current user's channel.
     *
     * {@link https://api-docs.nightbot.tv/#part-channel API Docs}
     */
    async partChannel(): Promise<void> {
        await this.auth.refresh();
        checkForEnoughScopes(this.auth, APIEndPoints.partChannel.requiredScopes);
        const res = await this.req.post({
            url: APIEndPoints.partChannel.endPoint,
            config: this.auth.generateReqConfig(),
        });
        if (res.status !== 200) throw new APIError(getErrorMessageFromAPIRes(res));
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
    async sendMessage(content: string, chatId?: string) {
        await this.auth.refresh();
        checkForEnoughScopes(this.auth, APIEndPoints.sendMessage.requiredScopes);
        const body: { message: string; chatId?: string } = { message: content };
        if (chatId) body.chatId = chatId;
        const res = await this.req.post({
            url: APIEndPoints.sendMessage.endPoint,
            body,
            config: this.auth.generateReqConfig(),
        });
        if (res.status !== 200) throw new APIError(getErrorMessageFromAPIRes(res));
        return;
    }
}
