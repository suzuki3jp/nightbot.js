# nightbot.js
**A useful [NightBot API](https://api-docs.nightbot.tv/) wrapper.**  
**This project is currently in the development phase.**

## Installation
```shell
npm install nightbot.js
```

## Usage
```ts
import { AuthManager, Client } from 'nightbot.js';

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
```
- Other examples are hereOther examples are [here](https://github.com/suzuki3jp/nightbot.js/tree/master/examples)

## Help
- [Support Server](https://suzuki-dev.com/support)

## LICENCE
[MIT](./LICENSE)