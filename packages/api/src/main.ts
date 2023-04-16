import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO(enhancement): CORS

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // TODO(enhancement): split into .env
  const PORT = 3001; // 3000 would be used by frontend
  await app.listen(PORT);
}
bootstrap();
