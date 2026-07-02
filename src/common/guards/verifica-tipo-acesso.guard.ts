import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VerificaTipoAcessoGuard implements CanActivate {

  constructor (private readonly prisma: PrismaService){}

  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const userId = request.headers['id']

    if(!userId){
      throw new NotFoundException(`Id ${userId} não encontrado`)
    }
    const tipoAcesso = await this.prisma.user.findUnique({
      where: {id : userId}
    })

    if(tipoAcesso?.tipoAcesso !== "ADMIN"){
      throw new ForbiddenException("Acesso não autorizado, somente administradores podem fazer alterações.")
    }

    request.user = tipoAcesso

    return true;
  }
}
