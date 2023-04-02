"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = exports.Client = exports.CommandManager = exports.ChannelManager = exports.AuthManager = void 0;
var AuthManager_1 = require("./AuthManager");
Object.defineProperty(exports, "AuthManager", { enumerable: true, get: function () { return AuthManager_1.AuthManager; } });
var index_1 = require("./manager/index");
Object.defineProperty(exports, "ChannelManager", { enumerable: true, get: function () { return index_1.ChannelManager; } });
Object.defineProperty(exports, "CommandManager", { enumerable: true, get: function () { return index_1.CommandManager; } });
var Client_1 = require("./Client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return Client_1.Client; } });
var Base_1 = require("./Base");
Object.defineProperty(exports, "Base", { enumerable: true, get: function () { return Base_1.Base; } });
//# sourceMappingURL=index.js.map