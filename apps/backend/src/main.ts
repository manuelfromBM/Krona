import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('ValidationPipe');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        logger.warn(`Body invalido: ${JSON.stringify(errors)}`);
        return new BadRequestException(errors);
      },
    }),
  );
  app.enableCors({ origin: true , credentials: true,});

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap().catch((err) => {
  console.error('Error starting server: ', err);
  process.exit(1);
});
