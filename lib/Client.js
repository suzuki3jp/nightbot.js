"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const Base_1 = require("./Base");
const index_1 = require("./manager/index");
class Client extends Base_1.Base {
    _auth;
    command;
    channel;
    constructor(auth) {
        super();
        this._auth = auth;
        this.command = new index_1.CommandManager(auth);
        this.channel = new index_1.ChannelManager(auth);
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map