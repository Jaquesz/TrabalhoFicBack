import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { VerificaTipoAcessoGuard } from 'src/common/guards/verifica-tipo-acesso.guard';
import { LoggerMiddleware } from 'src/common/middleware/logger/logger.middleware';

@UseInterceptors(LoggerMiddleware)
@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(createCursoDto);
  }

  @Get()
  findAll() {
    return this.cursoService.listarCursos();
  }

  @Get("/:id")
  findOne(@Param("id") id: number){
    return this.cursoService.findOne(id)
  }

  @Patch("/:id")
  update(@Param("id") id: number, @Body() dto: UpdateCursoDto){
    return this.cursoService.update(id, dto)
  }

  @UseGuards(VerificaTipoAcessoGuard)
  @Delete("/:id")
  delete(@Param("id") id: number){
    return this.cursoService.delete(id)
  }
  
  @Get("/busca/:titulo")
  buscaPorNome(@Param("titulo") titulo : string){
    return this.cursoService.buscaPorNome(titulo)
  }
}
