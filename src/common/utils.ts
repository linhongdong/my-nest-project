import { Constants } from './constants';

/**
 * 工具类
 */
export class Utils {
    /**
     * 根据状态码显示提示内容
     * @param code 状态码
     */
    static exceptionFilterChooseCode(code: number) {
        switch (code) {
            case 400:
                return Constants.BAD_REQUEST;
            case 401:
                return Constants.UNAUTHORIZED;
            case 404:
                return Constants.NOT_FOUND;
            case 500:
                return Constants.SERVER_INTERNAL_ERROR;
            default:
                return null;
        }
    }
}
/**
 * 将 T 中的所有属性，以及子属性设为只读
 * DeepReadonly<T>
 */
export type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> };
