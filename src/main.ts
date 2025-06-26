import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtGuard } from './auth/guards/jwt.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://blazed-app.vercel.app',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('API Blazed')
    .setDescription('Documentation de l’API Blazed')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalGuards(new JwtGuard(app.get(Reflector)));

  await app.listen(process.env.PORT ?? 10000);
}
bootstrap();
