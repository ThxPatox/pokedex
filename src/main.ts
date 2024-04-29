import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //elimina los campos que no esten en el dto
    forbidNonWhitelisted: true, //arroja un error si hay campos no permitidos
    // transform: true, //transforma los datos a los tipos de datos especificados en el dto
  }));
  await app.listen(3000);
}
bootstrap();
