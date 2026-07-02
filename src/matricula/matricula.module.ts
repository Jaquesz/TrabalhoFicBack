import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { MatriculaController } from './matricula.controller';
import { UsersModule } from 'src/users/users.module';
import { CursoModule } from 'src/curso/curso.module';
import { LoggerMiddleware } from 'src/common/middleware/logger/logger.middleware';

@Module({
  imports: [UsersModule, CursoModule],
  controllers: [MatriculaController],
  providers: [MatriculaService],
})
export class MatriculaModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(LoggerMiddleware)
        .forRoutes(MatriculaController);
  }
}
