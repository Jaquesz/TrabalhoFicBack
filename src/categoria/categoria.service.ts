import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriaService {
  constructor(private readonly prisma: PrismaService) {

  }

  async create(dto: CreateCategoriaDto) {
    try {
      return await this.prisma.categoria.create({
        data: {
        nome: dto.nome,
        descricao: dto.descricao,
      }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async listarCategorias() {
    return this.prisma.categoria.findMany({
      select: {
        nome: true,
        descricao: true,
        id: true
      }
    })
  }
  async listarCursosDaCategoria(id : number){
    return this.prisma.categoria.findUnique({
      where: {
        id
      },
      include: {
        cursos: true
      }
    })
  }
  async buscarCategoriaPorId(id: number) {
    const categoriaExists = await this.prisma.categoria.findUnique({
      where: {
        id: id
      }
    })
    if(!categoriaExists){
      throw new NotFoundException("Categoria não encontrada.")
    }
    return categoriaExists
  }
  async update(id: number, dto: UpdateCategoriaDto) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id }
    })
    if (!categoria) {
      throw new NotFoundException("Categoria não encontrada.")
    }
    try {
      const categoriaUpdate = await this.prisma.categoria.update({
        where: { id },
        data: {
          nome: dto.nome,
          descricao: dto.descricao
        }
      })
      return categoriaUpdate
    }
    catch (error) {
      throw new InternalServerErrorException("Erro ao atualizar categoria.")
    }
  }
  async delete(id : number){
    const categoria = await this.prisma.categoria.findUnique({
      where: { id }
    })
    if (!categoria) {
      throw new NotFoundException("Categoria não encontrada.")
    }
    try {
       await this.prisma.categoria.delete({
        where: {id}
      })
      return {message:"Categoria excluída com sucesso."}
    } 
    catch (error) {
      throw new InternalServerErrorException("Erro ao excluir categoria.")
    }
  }
  async buscaPorNome(nome : string){
    const categoria = await this.prisma.categoria.findMany({
      where: {nome : nome}
    })
    if(categoria.length === 0){
      throw new NotFoundException(`Categoria ${nome} não encontrada.`)
    }
    return categoria
  }
}
