import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './modules/company/company.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConverstationModule } from './modules/converstation/converstation.module';
import { RedisCacheModule } from './modules/cache/redis-cache.module';
import { PredictModule } from './modules/predict/predict.module';
import { PaymentModule } from './modules/payment/payment.module';
import { MainMiddleware } from './modules/middleware/main.middleware';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI
      }),
    }),
    CompanyModule,
    UserModule,
    AuthModule,
    ConverstationModule,
    RedisCacheModule,
    PredictModule,
    PaymentModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MainMiddleware).forRoutes('*')
  }
}
