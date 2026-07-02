import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { validaUsuario } from 'src/common/guards/valida-users.guard';
import { LoggerMiddleware } from 'src/common/middleware/logger/logger.middleware';

@Controller('matricula')
export class MatriculaController {
  constructor(private readonly matriculaService: MatriculaService) {}

  @UseInterceptors(LoggerMiddleware)
  @UseGuards(validaUsuario)
  @Post()
  create(@Body() createMatriculaDto: CreateMatriculaDto) {
    return this.matriculaService.matricula(createMatriculaDto);
  }

  @Get()
  findAll() {
    return this.matriculaService.listarTodas();
  }

  @UseGuards(validaUsuario)
  @Delete("/:id")
  delete(@Param("id") id: number){
    return this.matriculaService.cancelarMatricula(id)
  }
}
