import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = +process.env.APP_PORT || 3000;
  // app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    // .addBearerAuth()
    .setTitle('Air Quality App')
    .setDescription('Air Quality API Documentation')
    .setVersion('0.0.1')
    .addTag('AirQuality')
    .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
