/**
 * 工具类
 */
export class Util {}
/**
 * 将 T 中的所有属性，以及子属性设为只读
 * DeepReadonly<T>
 */
export type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> };
