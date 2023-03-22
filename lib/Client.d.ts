import { AuthManager } from './AuthManager';
import { Base } from './Base';
import { CommandsManager } from './manager/index';
export { CommandsManager } from './manager/index';
export declare class Client extends Base {
    _auth: AuthManager;
    command: CommandsManager;
    constructor(auth: AuthManager);
}
