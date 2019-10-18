import { CustomParamFactory } from '@nestjs/common/interfaces';
import { EmptyException } from '../exceptions/empty.exception';
import { Utils } from '../utils';
import { Constants } from '../constants/constants';

// export function Necessary() {
//     console.log('Necessary ===>>>');
//     // return function name(params: any) {
//     //     console.log('Necessary params===>>>', params);
//     //     return params;
//     // };
//     return () => any;
// }
// ((data, req) => {
//     // return req.body;
//     // return data ? req.body && req.body[data] : req.body;
//     return req.body && req.body[data];
// });
/*
// 会在编译的时候执行，不能达到想要的效果
export function Required(target: object, propertyKey: string | symbol, parameterIndex: number) {
    console.log('target ===>>>', target);
}
 */

/*
编译阶段就会执行，也不能达到想要的效果
export function Required(value: any) {
    console.log('Required ===>>>', value);
    return (target: object, propertyKey: string | symbol, parameterIndex: number) => {
        console.log('target ===>>>', target);
        console.log('propertyKey ===>>>', propertyKey);
        console.log('parameterIndex ===>>>', parameterIndex);
    };
}
*/
/*
编译阶段就会执行，也不能达到想要的效果
import 'reflect-metadata';
const requiredMetadataKey = Symbol('required');
export function Required(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    console.log('target===>>>', target);
    console.log('propertyName===>>>', propertyName);
    console.log('descriptor===>>>', descriptor);
    const method = descriptor.value;
    descriptor.value = function() {
        const requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (const parameterIndex of requiredParameters) {
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    throw new Error('Missing required argument.');
                }
            }
        }
        return method.apply(this, arguments);
    };
}
 */

// import { createParamDecorator } from '@nestjs/common';

/**
 * 因为装饰方法都是在编译阶段执行的，想要实现每次调用该方法后去执行是行不通的，参照 nestjs 自带的 createParamDecorator 方法实现的；
 * 参照 node_modules/@nestjs/common/decorators/http/create-route-param-metadata.decorator.js 实现；
 * 原理是创建一个参数装饰器，通过 Reflect.getMetadata 使用标识为 __routeArguments__ 获取元数据，然后再添加一些自定义的额外信息，例如 factory 方法，再去设置元数据；
 * 设置好后，每次执行被装饰后的方法是，都会检查 __customRouteArgs__ 标识，如果检测到，就去执行 factory 方法，从而实现每次都会执行；
 * 执行 factory 的方法在 node_modules/@nestjs/core/router/router-execution-context.js 里面；
 *
 * @param factory 每次调用该装饰器装饰后的方法时执行
 */
const createParamDecorator = (factory: CustomParamFactory) => {
    return (data: any = null) => (target: object, propertyKey: string | symbol, parameterIndex: number) => {
        const args = Reflect.getMetadata('__routeArguments__', target.constructor, propertyKey) || {};
        const assignCustomMetadata = Object.assign(Object.assign({}, args), {
            [`__customRouteArgs__:${parameterIndex}`]: { factory },
        });
        Reflect.defineMetadata('__routeArguments__', assignCustomMetadata, target.constructor, propertyKey);
    };
};
/**
 * 创建自定义装饰器
 * 校验全部字段必填
 * 注：使用 pipe 可以实现该用途
 * 注意：已废弃，应使用 RequiredPipe
 */
export const AllRequired = createParamDecorator((data, req) => {
    const params = req.body;
    if (Object.keys(params).length > 0) {
        const key = Utils.isEachFieldValueIsEmpty(params);
        if (key) {
            throw new EmptyException(`${key} ${Constants.FIELD_CANNOT_EMPTY}`);
        } else {
            return req.body;
        }
    } else {
        throw new EmptyException(Constants.FIELD_CANNOT_EMPTY);
    }
});
