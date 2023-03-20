import { RequestResponse } from '@suzuki3jp/utils';

export const getErrorMessageFromAPIRes = (res: RequestResponse): string => {
    if (res.data.message) return res.data.message;
    if (res.data.error_description) return res.data.error_description;
    return 'unknown api error';
};
