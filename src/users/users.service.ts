import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  async create(dto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (existingUser) {
      throw new ConflictException(`Já existe o e-mail ${dto.email}.`);
    }
    const user = await this.prisma.user.create({
      select:{
        name: true,
        email: true
      },
      data: {
        name: dto.name,
        email: dto.email.toLowerCase(),
        tipoAcesso: dto.tipoAcesso,
      },
    });
    return {message: "Usuário criado com sucesso.", user: user}
  }
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        tipoAcesso: true
      },
    });
  }
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`ID ${id} não encontrado.`);
    }
    return user;
  }
  async update(id: string, dto: UpdateUserDto) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: id },
        data: {
          name: dto.name,
          email: dto.email
        }
      })
      return updatedUser
    }
    catch (error) {
      throw new InternalServerErrorException("Erro ao atualizar dados do usuário")
    }
  }
  async Delete(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: { id }
    })
    if (!userExists) {
      throw new NotFoundException(`Usuário ${id} não encontrado.`)
    }
    try {
      await this.prisma.user.delete({
        where: { id }
      })
      return { message: "Usuário excluído com sucesso." }
    } 
    catch (error) {
      throw new InternalServerErrorException('Erro ao excluir usuário.')
    }
  }
}
