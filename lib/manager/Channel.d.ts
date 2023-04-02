import { AuthManager } from '../AuthManager';
import { Base } from '../Base';
import { ChannelData } from '../api-types/index';
export declare class ChannelManager extends Base {
    private auth;
    constructor(auth: AuthManager);
    /**
     * Gets the current API user's channel information.
     *
     * {@link https://api-docs.nightbot.tv/#get-channel API Docs}
     */
    getChannelByMe(): Promise<ChannelData>;
    /**
     * Makes Nightbot join(enter) the current user's channel.
     *
     * {@link https://api-docs.nightbot.tv/#join-channel API Docs}
     */
    joinChannel(): Promise<void>;
    /**
     * Makes Nightbot part(leave) the current user's channel.
     *
     * {@link https://api-docs.nightbot.tv/#part-channel API Docs}
     */
    partChannel(): Promise<void>;
    /**
     * Makes Nightbot send a message to the channel.
     * @param content - The message to send to chat. Maximum length: 400 characters.
     * @param chatId - The chat ID to send chat to. When not provided the message is sent to all chat rooms for this channel.
     *                 This is only useful for YouTube channels with multiple concurrent chat rooms.
     *
     * {@link https://api-docs.nightbot.tv/#send-channel-message API Docs}
     */
    sendMessage(content: string, chatId?: string): Promise<void>;
}
