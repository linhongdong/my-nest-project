import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { HeroEntity } from '../common/entities/hero.entity';
import { Config } from '../../config';
import { Constants } from '../common/constants';

// 所有实体类，对应
// const entities = [{ UserEntity }, { HeroEntity }];
// const ens = [UserEntity, HeroEntity];
const ens = Constants.db.entities;

// console.log('__dirname===================================>>>', __dirname);
// type Readonly<T> = { readonly [P in keyof T]: T[P] };
// // Config.MYSQL_OPTIONS.entityPrefix = '';
// type test = keyof string;
// type test2 = keyof ConnectionOptions;
// type test3 = string['slice'];
// // const name: test3 = ' sds sds ';
// // console.log(Config.MYSQL_OPTIONS);
// const a = { k1: 1, k2: 'v2' };
// type tv1 = (typeof a)['k1'];
// interface A {
//     k1: string;
//     k2: string;
//     k3: number;
// }
// type a_type = typeof a;
// type a_ro = Readonly<typeof a>;
// // tv1 为number
// // tv2 为string
// type tv2 = object[];
// console.log('UserEntity===================================>>>', UserEntity.name);

// export const dbProviders = [
//     {
//         provide: Constants.db.DATABASE_CONNECTION,
//         useFactory: async () => await createConnection(Object.assign(Config.MYSQL_OPTIONS, { entities: [...ens] })),
//     },
//     {
//         provide: Constants.db.USER,
//         useFactory: (connection: Connection) => connection.getRepository(UserEntity),
//         inject: [Constants.db.DATABASE_CONNECTION],
//     },
//     {
//         provide: Constants.db.HERO,
//         useFactory: (connection: Connection) => connection.getRepository(HeroEntity),
//         inject: [Constants.db.DATABASE_CONNECTION],
//     },
// ];
// const ens = [];
const enProviders = [];
ens.forEach(entity => {
    // const keys = Object.keys(entity);
    // const entityName = Object.keys(entity)[0];
    const entityName = entity.name;
    const dbKey = entityName.replace('Entity', '').toUpperCase();
    // ens.push(entity[entityName]);
    enProviders.push({
        provide: Constants.db[dbKey],
        useFactory: (connection: Connection) => connection.getRepository(entity),
        inject: [Constants.db.DATABASE_CONNECTION],
    });
});

export const dbProviders = [
    {
        provide: Constants.db.DATABASE_CONNECTION,
        useFactory: async () => await createConnection(Object.assign(Config.MYSQL_OPTIONS, { entities: [...ens] })),
    },
    ...enProviders,
];

console.log('all entity=========================>>>', dbProviders);
