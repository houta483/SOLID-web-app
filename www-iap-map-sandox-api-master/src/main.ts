import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppGateway } from './app.gateway';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  await app.listen(9985);
}
bootstrap();

