"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
const utils_1 = require("@suzuki3jp/utils");
class Base {
    req;
    constructor() {
        this.req = new utils_1.RequestClient({ baseUrl: 'https://api.nightbot.tv' });
    }
}
exports.Base = Base;
//# sourceMappingURL=Base.js.map