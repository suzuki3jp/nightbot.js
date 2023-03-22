import { Scopes, UserLevel } from './index';

export interface GetMeResponse {
    status: 200;
    authorization: {
        userLevel: UserLevel;
        authType: string;
        credentials: {
            expires: string;
            client: string;
        };
        scopes: Scopes[];
    };
    user: {
        _id: string;
        name: string;
        displayName: string;
        provider: string;
        providerId: string;
        avatar: string;
        admin: boolean;
    };
}
