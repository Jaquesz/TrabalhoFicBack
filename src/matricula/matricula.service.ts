import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CursoService } from 'src/curso/curso.service';

@Injectable()
export class MatriculaService {

  constructor(private readonly prisma: PrismaService, private alunoService : UsersService, private cursoService : CursoService){}
  
  async matricula(dto: CreateMatriculaDto){
    const usersExists = await this.alunoService.findOne(dto.userId)
    const cursoExiste = await this.cursoService.findOne(dto.cursoId)
    
    const matricula = await this.prisma.matricula.create({
      data: {
        userId: dto.userId,
        cursoId: dto.cursoId
      }
    })
    return {message: "Aluno matriculado com sucesso.", matricula: matricula}
  }

  async listarTodas(){
    return await this.prisma.matricula.findMany({
      select: {
        userId: true,
        cursoId: true,
        id: true
      }
    })
  }
  async cancelarMatricula(id: number){
    const matricula = await this.prisma.matricula.findUnique({
      where: {id}
    })
    if(!matricula){
      throw new NotFoundException("Matrícula não encontrada.")
    }
    try {
      const matriculaCancelada = await this.prisma.matricula.delete({
        where: {id : id}
      })
      return {message: "Matrícula cancelada com sucesso.", id: matricula} 
    } 
    catch (error) {
      throw new InternalServerErrorException("Erro em cancelar a matrícula.")
    }
  }
}
