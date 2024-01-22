import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, // DTO dışında kalan alanlar için hata fırlat
      whitelist: true, // Sadece DTO alanlarına izin ver
    }),
  );
  app.enableCors();
  Logger.log('starter project 3010 port');
  await app.listen(3010);
}
bootstrap();
