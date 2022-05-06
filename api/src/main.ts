import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  var whitelist = ['http://localhost:4300', 'http://localhost:4200'];
  const headers = {
    'Access-Control-Allow-Headers': '*', // this will allow all CORS requests
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET', // this states the allowed methods
    'Content-Type': 'application/json', // this shows the expected content type
  };

  app.enableCors({
    origin: ['http://localhost:4300','http://localhost:4200'],
    credentials: true,
  });

  // somewhere in your initialization file
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap().then();
