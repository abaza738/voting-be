import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') ?? 3030;
  await app.listen(port);
}
bootstrap();
