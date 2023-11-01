import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { CompanySchema } from '../company/company.model';
import { UserSchema } from '../user/user.model';


export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<Connection> => {
            return await mongoose.createConnection(process.env.MONGODB_URI);
        },
    },
    {
        provide: 'CompanyModelToken',
        useFactory: (connection: Connection) => connection.model('Company', CompanySchema),
        inject: ['DATABASE_CONNECTION'], // 'DATABASE_CONNECTION' ile eşleşmeli
    },
    {
        provide: 'UserModelToken',
        useFactory: (connection: Connection) => connection.model('User', UserSchema),
        inject: ['DATABASE_CONNECTION'], // 'DATABASE_CONNECTION' ile eşleşmeli
    }
];