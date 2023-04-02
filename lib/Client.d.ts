import { AuthManager } from './AuthManager';
import { Base } from './Base';
import { ChannelManager, CommandManager } from './manager/index';
export declare class Client extends Base {
    _auth: AuthManager;
    command: CommandManager;
    channel: ChannelManager;
    constructor(auth: AuthManager);
}
