import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { LoggingInterceptor } from '@algoan/nestjs-logging-interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['debug'],
  });

  const config = new DocumentBuilder()
    .setTitle('unity on nest')
    .setDescription('The unity API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors();

  await app.listen(port || 3000);

  Logger.log(
    `Server started running on:   http://localhost:${port}`,
    'Bootstrap',
  );
}

bootstrap();
