import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { LoggerMiddleware } from 'src/common/middleware/logger/logger.middleware';

@Module({
  controllers: [CursoController],
  providers: [CursoService],
  exports: [CursoService]
})
export class CursoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CursoController);
  }
}