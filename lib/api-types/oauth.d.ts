export type Scopes = 'channel' | 'channel_send' | 'commands' | 'commands_default' | 'regulars' | 'song_requests' | 'song_requests_queue' | 'song_requests_playlist' | 'spam_protection' | 'subscribers' | 'timers';
export interface RefreshTokenResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}
