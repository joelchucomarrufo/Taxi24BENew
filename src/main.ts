import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const dataSource = app.get(DataSource);
  if (dataSource.isInitialized) {
    console.log('✅ Base de datos conectada correctamente');
  } else {
    console.error('❌ Falló la conexión a la base de datos');
  }

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Taxi24 API')
      .setDescription('Documentación del backend del challenge Taxi24')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    console.log('📘 Swagger disponible en: http://localhost:3000/api');
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 API corriendo en: http://localhost:${port}`);
}

bootstrap();