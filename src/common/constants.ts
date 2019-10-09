import { DbConstants } from './db.constants';

export class Constants {
    // db.constants.ts 数据库常量
    static readonly db: Readonly<DbConstants> = new DbConstants();

    // 接口返回提示新信息
    static readonly REQUEST_SUCCESS: string = '成功';
    static readonly NO_DATA_FOUND: string = '没有查询到数据';
    static readonly UNAUTHORIZED: string = '权限验证失败，请请重新登录';
    static readonly SERVER_INTERNAL_ERROR: string = '服务器内部错误';
    static readonly BAD_REQUEST: string = '错误请求，参数获取失败';
    static readonly NOT_FOUND: string = '请求地址不存在';
}
// export const jwtConstants: object = {
//     secret: 'secretKey',
// };
