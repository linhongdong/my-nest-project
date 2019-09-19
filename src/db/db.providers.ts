import { createConnection, Connection } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import Config from '../../config';
import Constants from '../common/constants';

// 所有实体类，对应
const ens = [UserEntity];

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
];
