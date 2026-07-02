import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CursoService { 
  constructor(private readonly prisma : PrismaService){}
  async create(createCursoDto: CreateCursoDto) {
    try{
    const curso = await this.prisma.curso.create({
      data: {
        titulo: createCursoDto.titulo,
        descricao: createCursoDto.descricao,
        cargaHoraria: createCursoDto.cargaHoraria,
        categoriaId: createCursoDto.categoriaId
      }
    })
    return {message: "Curso cadastrado com sucesso!", curso: curso}
  }
  catch(error){
    throw new InternalServerErrorException("Erro ao cadastrar curso.")
  }
  }

  async listarCursos() {
    return this.prisma.curso.findMany({
      select: {
        id: true,
        titulo: true,
        descricao: true,
        cargaHoraria: true,
      }
    })
  }
  async listarAlunosDoCurso(id: number){
    return this.prisma.curso.findUnique({
      where: {id},
      include: {
        matriculas: true
      }
    })
  }
  async findOne(id : number){
    const curso = await this.prisma.curso.findUnique({
      where: {id},
      select: {
        id: true,
        titulo: true,
        descricao: true,
        cargaHoraria: true
      }
    })
    if(!curso){
      throw new NotFoundException("Curso não encontrado.")
    }
    return curso
  }
  async update(id : number, dto: UpdateCursoDto){
    const curso = await this.prisma.curso.findUnique({
      where: {id}
    })
    if(!curso){
      throw new NotFoundException("Curso não encontrado.")
    }
    try {
      const cursoUpdate= await this.prisma.curso.update({
      where: {id : id},
      data: {
        titulo: dto.titulo,
        descricao: dto.descricao,
        cargaHoraria: dto.cargaHoraria
      }
    })
    return {message: "Curso atualizado com sucesso!", curso: cursoUpdate}
    } 
    catch (error) {
      throw new InternalServerErrorException("Erro ao atualizar curso.")
    }
  }
    async delete(id: number) {
    const curso = await this.prisma.curso.findUnique({
      where: { id }
    })
    if (!curso) {
      throw new NotFoundException(`Curso ${id} não encontrado.`)
    }
    try {
      await this.prisma.curso.delete({
        where: { id }
      })
      return { message: "Curso excluído com sucesso." }
    } 
    catch (error) {
      throw new InternalServerErrorException('Erro ao excluir curso.')
    }
}
  async buscaPorNome(titulo : string){
      const curso = await this.prisma.curso.findMany({
      where: { titulo : titulo}
    })
    if(curso.length === 0){
      throw new NotFoundException(`Curso ${titulo} não encontrado.`)
    }
    return curso
  }
}
