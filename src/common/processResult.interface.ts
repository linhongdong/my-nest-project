import { Constants } from './constants/constants';

export class ProcessResult {
    // timestamp: string;
    // code: number;
    // message: string;
    // data: any;
    // error?: string | object;
    constructor(msg: string = Constants.REQUEST_SUCCESS, result: boolean = true) {
        return { msg, result };
    }
}
