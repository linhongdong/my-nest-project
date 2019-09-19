import { Module } from '@nestjs/common';
import { dbProviders } from './db.providers';
// import { databaseProviders } from './database.providers';

@Module({
    providers: [...dbProviders],
    exports: [...dbProviders],
})
export class DbModule {}
