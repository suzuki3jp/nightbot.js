"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.CommandsManager = void 0;
const Base_1 = require("./Base");
const index_1 = require("./manager/index");
var index_2 = require("./manager/index");
Object.defineProperty(exports, "CommandsManager", { enumerable: true, get: function () { return index_2.CommandsManager; } });
class Client extends Base_1.Base {
    _auth;
    command;
    constructor(auth) {
        super();
        this._auth = auth;
        this.command = new index_1.CommandsManager(auth);
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map