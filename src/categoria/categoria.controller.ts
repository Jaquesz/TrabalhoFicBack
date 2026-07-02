import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { VerificaTipoAcessoGuard } from 'src/common/guards/verifica-tipo-acesso.guard';


@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @UseGuards(VerificaTipoAcessoGuard)
  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.categoriaService.listarCategorias();
  }

  @Get("/:id")
  buscaPorId(@Param("id") id: number){
    return this.categoriaService.buscarCategoriaPorId(id)
  }

  @Get("/curso/:id")
  listaCursos(@Param("id") id: number){
    return this.categoriaService.listarCursosDaCategoria(id)
  }

  @Get("/busca/:nome")
  buscaPorNome(@Param("nome") nome : string){
    return this.categoriaService.buscaPorNome(nome)
  }

  @UseGuards(VerificaTipoAcessoGuard)
  @Patch("/:id")
  update(@Param("id") id: number, @Body() dto : UpdateCategoriaDto){
    return this.categoriaService.update(id, dto)
  }

  @UseGuards(VerificaTipoAcessoGuard)
  @Delete("/:id")
  delete(@Param("id") id: number){
    return this.categoriaService.delete(id)
  }
}
