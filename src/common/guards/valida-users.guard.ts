import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class validaUsuario implements CanActivate {

  constructor (private readonly prisma: PrismaService){}

  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const userId = request.headers['id']

    if(!userId){
      throw new NotFoundException("Identificação não informada.")
    }
    const usuarioValido = await this.prisma.user.findUnique({
      where: {id : userId}
    })

    if(!usuarioValido){
        throw new UnauthorizedException("Usuário não encontrado.")
    }

    request.user = usuarioValido

    return true;
  }
}