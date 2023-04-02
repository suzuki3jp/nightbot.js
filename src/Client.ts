import { AuthManager } from './AuthManager';
import { Base } from './Base';
import { ChannelsManager, CommandsManager } from './manager/index';
export { CommandsManager } from './manager/index';

export class Client extends Base {
    _auth: AuthManager;
    command: CommandsManager;
    channel: ChannelsManager;

    constructor(auth: AuthManager) {
        super();
        this._auth = auth;
        this.command = new CommandsManager(auth);
        this.channel = new ChannelsManager(auth);
    }
}
