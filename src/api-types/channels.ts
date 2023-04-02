export interface GetChannelResponse {
    status: number;
    channel: ChannelData;
}

/**
 * {@link https://api-docs.nightbot.tv/#channel-resource API Docs}
 */
export interface ChannelData {
    _id: string;
    name: string;
    displayName: string;
    joined: boolean;
    plan: string;
}
