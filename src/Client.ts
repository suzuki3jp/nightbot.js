import { AuthManager } from './AuthManager';
import { Base } from './Base';
import { ChannelManager, CommandManager } from './manager/index';

export class Client extends Base {
    _auth: AuthManager;
    command: CommandManager;
    channel: ChannelManager;

    constructor(auth: AuthManager) {
        super();
        this._auth = auth;
        this.command = new CommandManager(auth);
        this.channel = new ChannelManager(auth);
    }
}
