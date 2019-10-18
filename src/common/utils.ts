import { Constants } from './constants/constants';
import { string } from '@hapi/joi';

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
    /**
     * 返回 false 时，每个属性值都存在；
     * 某个属性值为 null undefined '' 时，返回该属性 key
     * @param params 要校验的对象
     */
    static isEachFieldValueIsEmpty(params: object) {
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const value = params[key];
                if (null === value || undefined === value || '' === value) {
                    return key;
                }
            }
        }
        return false;
    }
    /**
     *  返回 false 时，该属性值存在；
     * 属性值为 null undefined '' 时，返回该属性 key
     * @param params 要校验的对象
     * @param keys 要校验的对象
     */
    static isFieldCannotEmpty(params: object, keys: string[] | string) {
        if (Array.isArray(keys)) {
            for (const key of keys) {
                const value = params[key];
                if (null === value || undefined === value || '' === value) {
                    return key;
                }
            }
        }
        if ('string' === typeof keys) {
            const value = params[keys];
            if (null === value || undefined === value || '' === value) {
                return keys;
            }
        }
        return false;
    }
}
/**
 * 将 T 中的所有属性，以及子属性设为只读
 * DeepReadonly<T>
 */
export type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> };
