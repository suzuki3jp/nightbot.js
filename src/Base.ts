import { RequestClient } from '@suzuki3jp/utils';

import { APIEndPoints } from './api-types/index';

export class Base {
    public req: RequestClient;
    constructor() {
        this.req = new RequestClient({ baseUrl: APIEndPoints.base });
    }
}
