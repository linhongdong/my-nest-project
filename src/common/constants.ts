import { DbConstants } from './db.constants';

export class Constants {
    // db.constants.ts 数据库常量
    static readonly db: DbConstants = new DbConstants();

    static readonly REQUEST_SUCCESS: string = '请求成功';
    static readonly NO_DATA_FOUND: string = '没有查询到数据';
}
// export const jwtConstants: object = {
//     secret: 'secretKey',
// };
