import { RequestClient } from '@suzuki3jp/utils';

export class Base {
    public req: RequestClient;
    constructor() {
        this.req = new RequestClient({ baseUrl: 'https://api.nightbot.tv' });
    }
}
