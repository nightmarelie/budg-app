import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RequestMethod } from '@nestjs/common';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './logger';
import compression from '@fastify/compress';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useLogger(app.get(LoggerService));

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('port');

  await app.register(helmet);
  await app.register(fastifyCsrf);

  app.enableCors({
    origin: '*', // TODO: put it to config
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // FIXME: put version to config
  app.setGlobalPrefix('v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  // FIXME: put it to config
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Budge API')
    .setDescription('API for budget application')
    .setVersion('1.0')
    .addTag('budge')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.register(compression, { encodings: ['gzip', 'deflate'] });

  await app.listen(PORT);
}
bootstrap();
