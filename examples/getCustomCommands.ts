import { AuthManager, Client } from '../src/index';

(async () => {
    const auth = new AuthManager({
        clientInfo: {
            clientId: 'your app client id',
            clientSecret: 'your app client secret',
            redirectUri: 'your app redirect uri',
        },
        tokenInfo: {
            accessToken: 'your app access token',
            refreshToken: 'your app refresh token',
        },
    });
    const client = new Client(auth);

    const customCommands = await client.command.getCustomCommandsByMe();
})();
