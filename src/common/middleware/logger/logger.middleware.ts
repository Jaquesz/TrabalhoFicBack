import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const now = new Date().toISOString();
    if(req.method === "GET"){
      console.log("Acesso para listar cursos.")
    }
    if(req.method === "POST" && req.originalUrl.includes('matricula')){
      console.log("Tentativa de matrícula.")
    }
    if(req.method === "DELETE"){
      console.log("Tentativa de exclusão de curso.")
    }
    if(req.originalUrl.includes('curso')){
      console.log(`Data acessada: ${now}, metódo: ${req.method}, rota: ${req.originalUrl}`);
    }
    next();
  }
}
