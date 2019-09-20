import { createConnection, Connection } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { HeroEntity } from './entities/hero.entity';
import Config from '../../config';
import Constants from '../common/constants';

// 所有实体类，对应
// const ens = [{ UserEntity }, { HeroEntity }];
const ens = [UserEntity, HeroEntity];

export const dbProviders = [
    {
        provide: Constants.db.DATABASE_CONNECTION,
        useFactory: async () => await createConnection(Object.assign(Config.MYSQL_OPTIONS, { entities: [...ens] })),
    },
    {
        provide: Constants.db.USER,
        useFactory: (connection: Connection) => connection.getRepository(UserEntity),
        inject: [Constants.db.DATABASE_CONNECTION],
    },
    {
        provide: Constants.db.HERO,
        useFactory: (connection: Connection) => connection.getRepository(HeroEntity),
        inject: [Constants.db.DATABASE_CONNECTION],
    },
];

// export const dbProviders = [
//     {
//         provide: Constants.db.DATABASE_CONNECTION,
//         useFactory: async () =>
//             await createConnection(Object.assign(Config.MYSQL_OPTIONS, { entities: [UserEntity, HeroEntity] })),
//     },
// ];

// export const enProviders = [];
// ens.forEach(entity => {
//     const keys = Object.keys(entity);
//     console.log('key=========================>>>', keys);

//     const key = Object.keys(entity)[0];
//     console.log('entity[key]=========================>>>', entity[key]);
//     console.log('key=========================>>>', key);

//     enProviders.push({
//         provide: Constants.db.UserEntity,
//         useFactory: (connection: Connection) => connection.getRepository(entity.UserEntity),
//         inject: [Constants.db.DATABASE_CONNECTION],
//     });

//     console.log('=========================>>>', entity);
// });
// console.log('all=========================>>>', enProviders);

// {
//     provide: Constants.db.USER,
//     useFactory: (connection: Connection) => connection.getRepository(UserEntity),
//     inject: [Constants.db.DATABASE_CONNECTION],
// },
// {
//     provide: Constants.db.USER,
//     useFactory: (connection: Connection) => connection.getRepository(HeroEntity),
//     inject: [Constants.db.DATABASE_CONNECTION],
// },
