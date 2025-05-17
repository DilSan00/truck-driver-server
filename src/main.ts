import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        // Форматируем ошибки в читаемый массив
        return new BadRequestException(errors);
      },
    }),
  );

  // app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Internet Service API')
    .setDescription('API for managing internet service providers')
    .setVersion('1.0')
    .addTag('internet-service')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
