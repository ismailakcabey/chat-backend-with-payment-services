import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { CompanySchema } from '../company/company.model';
import { UserSchema } from '../user/user.model';
import { ConverstationSchema } from '../converstation/converstation.model';
import { PredictSchema } from '../predict/predict.model';


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
    },
    {
        provide: 'ConverstationModelToken',
        useFactory: (connection: Connection) => connection.model('Converstation', ConverstationSchema),
        inject: ['DATABASE_CONNECTION'], // 'DATABASE_CONNECTION' ile eşleşmeli
    },
    {
        provide: 'PredictModelToken',
        useFactory: (connection: Connection) => connection.model('Predict', PredictSchema),
        inject: ['DATABASE_CONNECTION'], // 'DATABASE_CONNECTION' ile eşleşmeli
    }
];